import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

/**
 * Populate db with a schema and data for test purpose only
 */
export const populateDatabase = async (model: any, data: any[]) => {
    try {
        const result = await model.insertMany(data);
        return result;
    } catch (err) {
        console.error("populateDatabase failed", err);
        return err;
    }
};

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
    try {
        mongod = await MongoMemoryServer.create({
            instance: { port: 5500, dbName: "testapp" },
        });
        const uri = await mongod.getUri();
        await mongoose.connect(uri);
    } catch (error) {
        console.error("ERROR: connect test db:", error);
        return error;
    }
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
        await mongod.stop();
    } catch (err) {
        console.error("ERROR: closeDatabase :", closeDatabase);
        return err;
    }
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
