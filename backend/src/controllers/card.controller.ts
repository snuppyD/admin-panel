import {Request, Response} from "express";
import Card from "../models/card.model";

// GET /api/cards — get all cards
export const getCards = async (_: Request, res: Response): Promise<void> => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({message: "Failed to fetch cards"});
    }
};