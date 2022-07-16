import express from "express";
import expressLoader from "../../bootstrap/express";

export const initializeApp = () => {
    const app = express();
    expressLoader(app);
    app.post("/api/test", (req, res) => {
        const { name } = req.body;
        res.status(201).json({ message: "This is just a test" });
    });

    return app;
};
