import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { Router } from "express";
import { ModuleRouters } from "../modules";

const configRouter = () => {
    const router = Router();
    router.use(ModuleRouters);
    return router;
};

export default async (app: express.Application) => {
    // Body parser only needed during POST on the graphQL path
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    app.use(bodyParser.text());

    // Cors configuration
    app.use(cors());

    // Sets various HTTP headers to help protect our app
    app.use(
        helmet({
            contentSecurityPolicy:
                process.env.NODE_ENV === "production" ? undefined : false,
        })
    );
    app.use(morgan("dev"));

    const routes = configRouter();
    app.use("/v1", routes);
};
