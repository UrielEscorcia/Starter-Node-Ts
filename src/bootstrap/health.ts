import { createTerminus, TerminusState } from "@godaddy/terminus";
import { Server } from "http";
import { closeDatabase, checkConnection } from "./mongo";

const onHealthCheck = async ({ state }: { state: TerminusState }) => {
    console.log("Health check called");
    const [dbStatus] = await Promise.all([checkConnection()]);
    return { ...dbStatus };
};

const onSignal = () => {
    console.log("server is starting cleanup");
    return Promise.all([
        // your clean logic, like closing database connections
        closeDatabase(),
    ]);
};

const onShutdown = async () => {
    console.log("cleanup finished, server is shutting down");
};

export const initializeHealthCheck = (server: Server) => {
    createTerminus(server, {
        healthChecks: { "/health": onHealthCheck },
        signals: ["SIGTERM", "SIGINT"],
        onSignal,
        onShutdown,
    });
};
