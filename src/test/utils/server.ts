import express from "express";
import expressLoader from "../../bootstrap/express";

export const initializeApp = () => {
    const app = express();
    expressLoader(app);

    return app;
};
