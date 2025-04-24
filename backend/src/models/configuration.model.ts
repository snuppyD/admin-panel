import {Schema, model, Types} from "mongoose";
import {IConfiguration, IConfigurationItem} from "../types";

const configurationItemSchema = new Schema<IConfigurationItem>({
    name: {type: String, required: true},
    type: {
        type: String,
        enum: ["slideshow", "2_row_horizontal", "1_row_horizontal", "single_card_description"],
    },
    sortCardsBy: {
        type: String,
        enum: ["views", "created", "last_watched"],
    },
    cards: [{type: Types.ObjectId, ref: "Card"}]
});

const configurationSchema = new Schema<IConfiguration>({
    name: {type: String, required: true},
    configuration: {type: [configurationItemSchema]},
});

export default model<IConfiguration>("Configuration", configurationSchema);