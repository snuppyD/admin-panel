import {Schema, model} from "mongoose";
import {IActiveConfiguration} from "../types";

const activeConfiguration = new Schema<IActiveConfiguration>({
    activeConfigurationId: {type: Schema.Types.ObjectId, required: true, ref: 'Configuration'},
});

export default model("ActiveConfiguration", activeConfiguration);