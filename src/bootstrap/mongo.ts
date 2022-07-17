import { HealthCheckError } from "@godaddy/terminus";
import mongoose from "mongoose";

import { config } from "../config";

// Your Mongoose setup goes here
export const checkConnection = async () => {
    if (mongoose.connection.readyState == 1) {
        return {
            dbStatus: "ok",
        };
    }
    throw new HealthCheckError("DB Disconnected", "DB is disconnected");
};
export const closeDatabase = () => mongoose.connection.close();
export const mongooseLoader = async () => mongoose.connect(config.mongoDB.uri);
