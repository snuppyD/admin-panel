import mongoose from "mongoose";
import dotenv from "dotenv";
import Card from "../models/card.model";
import Configuration from "../models/configuration.model";
import ActiveConfiguration from "../models/activeConfiguration.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
}

const cardData = [
    {
        name: "Breaking Bad",
        description: "A high school chemistry teacher turns to a life of crime.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_.jpg",
    },
    {
        name: "Game of Thrones",
        description: "Nine noble families fight for control over the lands of Westeros.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        name: "Stranger Things",
        description: "A group of young friends witness supernatural forces and secret government exploits.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        name: "The Witcher",
        description: "A mutated monster-hunter struggles to find his place in a world.",
        imageUrl: "https://store-images.s-microsoft.com/image/apps.13986.69531514236615003.534d4f71-03cb-4592-929a-b00a7de28b58.c4152bcf-9088-4e35-98b5-9a2e44b927c5",
    },
    {
        name: "Peaky Blinders",
        description: "A gangster family epic set in 1900s England.",
        imageUrl: "https://m.media-amazon.com/images/I/91VjQqAWx-L._AC_UF1000,1000_QL80_.jpg",
    },
    {
        name: "Dark",
        description: "A family saga with a supernatural twist.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BOWJjMGViY2UtNTAzNS00ZGFjLWFkNTMtMDBiMDMyZTM1NTY3XkEyXkFqcGc@._V1_.jpg",
    },
    {
        name: "The Office",
        description: "A mockumentary on a group of typical office workers.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        name: "Friends",
        description: "Follows the personal and professional lives of six twenty to thirty-something friends.",
        imageUrl: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/friends_series_poster.png",
    },
    {
        name: "Sherlock",
        description: "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BNTQzNGZjNDEtOTMwYi00MzFjLWE2ZTYtYzYxYzMwMjZkZDc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    {
        name: "Better Call Saul",
        description: "The trials and tribulations of criminal lawyer Jimmy McGill.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BNDdjNTEzMjMtYjM3Mi00NzQ3LWFlNWMtZjdmYWU3ZDkzMjk1XkEyXkFqcGc@._V1_.jpg",
    },
    {
        name: "Narcos",
        description: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.",
        imageUrl: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11993086_b_v12_af.jpg",
    },
    {
        name: "House of Cards",
        description: "A Congressman works with his equally conniving wife to exact revenge.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMTQ4MDczNDYwNV5BMl5BanBnXkFtZTcwNjMwMDk5OA@@._V1_.jpg",
    },
    {
        name: "Money Heist",
        description: "A criminal mastermind plans the biggest heist in recorded history.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMmNkMWZmNWQtNjljNi00YTU4LTg0ZTEtY2U0OTk0MmI3NTNmXkEyXkFqcGc@._V1_.jpg",
    },
    {
        name: "Squid Game",
        description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMDA0NDBkMzMtOWQ0Zi00NjE1LTkxNWYtYzI0MTE0NGJjZTQ1XkEyXkFqcGc@._V1_.jpg",
    },
    {
        name: "Black Mirror",
        description: "An anthology series exploring a twisted, high-tech multiverse.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BODcxMWI2NDMtYTc3NC00OTZjLWFmNmUtM2NmY2I1ODkxYzczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
];

const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

const run = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        await Card.deleteMany();
        await Configuration.deleteMany();
        await ActiveConfiguration.deleteMany();

        const createdCards = await Card.insertMany(
            cardData.map((card) => ({
                ...card,
                viewsCount: randomInt(1, 10000),
            }))
        );

        console.log("✅ Cards created");

        const getRandomCards = () =>
            createdCards
                .sort(() => 0.5 - Math.random())
                .slice(0, randomInt(3, 7))
                .map((card) => card._id);

        const configNames: string[] = ["Top", "Most popular", "New"];
        const types: string[] = ["slideshow", "2_row_horizontal", "1_row_horizontal", "single_card_description"];
        const sortOptions: string[] = ["views", "created", "last_watched"];

        const configurations = await Configuration.insertMany(
            configNames.map((name) => ({
                name,
                configuration: [
                    {
                        name: `${name} Section`,
                        type: getRandomElement(types),
                        sortCardsBy: getRandomElement(sortOptions),
                        cards: getRandomCards(),
                    },
                ],
            }))
        );

        console.log("✅ Configurations created");

        const randomConfig = getRandomElement(configurations);

        await ActiveConfiguration.create({
            activeConfigurationId: randomConfig._id,
        });

        console.log("✅ Active configuration created");
    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

run();