import {Schema, model} from "mongoose";
import {ICard} from "../types";

const cardSchema = new Schema<ICard>({
    name: {type: String},
    description: String,
    imageUrl: {type: String},
    viewsCount: {type: Number, default: 0},
});

export default model("Card", cardSchema);