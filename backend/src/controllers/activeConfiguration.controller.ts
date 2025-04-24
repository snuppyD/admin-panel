import {Request, Response} from "express";
import ActiveConfiguration from "../models/activeConfiguration.model";
import {Types} from "mongoose";
import Configuration from "../models/configuration.model";

// GET /api/activeConfiguration — get active configuration id
export const getActiveConfigurationId = async (_: Request, res: Response): Promise<void> => {
    try {
        const config = await ActiveConfiguration.findOne();
        if (!config) {
            res.status(404).json({message: "No active configuration set."});
            return;
        }
        res.status(200).json({activeConfigurationId: config.activeConfigurationId});
    } catch (error) {
        console.error("Error fetching active configuration ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

// GET /api/active — get full configuration by active id
export const getActiveConfiguration = async (_: Request, res: Response): Promise<void> => {
    try {
        const activeConfig = await ActiveConfiguration.findOne();
        if (!activeConfig?.activeConfigurationId) {
            res.status(404).json({message: "No active configuration found."});
            return;
        }
        const configuration = await Configuration.findById(activeConfig.activeConfigurationId);
        if (!configuration) {
            res.status(404).json({message: "Configuration not found."});
            return;
        }
        res.status(200).json(configuration);
    } catch (error) {
        console.error("Error fetching active configuration:", error);
        res.status(500).json({message: "Server error while fetching active configuration."});
    }
};

// PUT /api/activeConfiguration/:id — set active configuration
export const setActiveConfiguration = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({error: "Invalid configuration ID"});
            return;
        }
        const configExists = await Configuration.exists({_id: id});
        if (!configExists) {
            res.status(404).json({error: "Configuration not found"});
            return;
        }
        const updated = await ActiveConfiguration.findOneAndUpdate(
            {},
            {activeConfigurationId: id},
            {new: true, upsert: true}
        );
        res.status(200).json({
            message: "Active configuration updated successfully",
            activeConfigurationId: updated?.activeConfigurationId,
        });
    } catch (error) {
        console.error("Error setting active configuration:", error);
        res.status(500).json({error: "Internal server error"});
    }
};