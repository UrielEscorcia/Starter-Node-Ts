import "reflect-metadata";
import * as mongoose from "mongoose";
import App from "./bootstrap";
import { config } from "./config";

const port = config.port || 8080;

const server = App.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${config.port}`)
);

function handleExit(signal: string) {
    console.info(`Received ${signal}. Close my server properly.`);
    console.log("Closing http server.");

    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
}

process.on("SIGTERM", handleExit);
process.on("SIGINT", handleExit);
// process.on("SIGQUIT", handleExit);
