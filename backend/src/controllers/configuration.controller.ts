import {Request, Response} from "express";
import Configuration from "../models/configuration.model";
import {Types} from "mongoose";

// GET /api/configuration - get all configurations
export const getConfigurations = async (_: Request, res: Response): Promise<void> => {
    try {
        const configs = await Configuration.find().sort({order: 1});
        res.status(200).json(configs);
    } catch (error) {
        console.error("Error getting configurations:", error);
        res.status(500).json({message: "Failed to get configurations"});
    }
};

// POST /api/configuration - create new configuration
export const createConfiguration = async (req: Request, res: Response): Promise<void> => {
    try {
        await Configuration.create(req.body);
        const allConfigurations = await Configuration.find();
        res.status(201).json(allConfigurations);
    } catch (error) {
        console.error("Error creating configuration:", error);
        res.status(500).json({message: "Server error", error});
    }
};

// PUT /api/configuration/:id - update configuration
export const updateConfiguration = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({message: "Invalid configuration ID"});
            return;
        }
        const updated = await Configuration.findByIdAndUpdate(id, req.body, {new: true});
        if (!updated) {
            res.status(404).json({message: "Configuration not found"});
        }
        res.status(200).json(updated);
    } catch (error) {
        console.error("Error updating configuration:", error);
        res.status(500).json({message: "Failed to update configuration"});
    }
};

// DELETE /api/configuration/:id - delete configuration
export const deleteConfiguration = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const deleted = await Configuration.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({message: "Configuration not found"});
            return;
        }
        res.status(200).send({message: "Configuration deleted"});
    } catch (error) {
        console.error("Error deleting configuration:", error);
        res.status(500).json({message: "Failed to delete configuration"});
    }
};