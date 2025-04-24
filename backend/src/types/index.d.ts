export interface IConfigurationItem {
    name: string;
    type: "slideshow" | "2_row_horizontal" | "1_row_horizontal" | "single_card_description";
    sortCardsBy: "views" | "created" | "last_watched";
    cards?: Types.ObjectId[];
}

export interface IConfiguration extends Document {
    name: string;
    configuration: IConfigurationItem[];
}

export interface ICard extends Document {
    name: string;
    description: string;
    imageUrl: string;
    viewsCount: number;
}

export interface IActiveConfiguration extends Document {
    activeConfigurationId: Types.ObjectId;
}