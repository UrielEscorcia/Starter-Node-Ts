import mongoose from "mongoose";

import { config } from "../config";

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

// Your Mongoose setup goes here
export default async () => mongoose.connect(config.mongoDB.uri);
