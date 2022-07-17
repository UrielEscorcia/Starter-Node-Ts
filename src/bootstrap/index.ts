import express from "express";

// loaders
import expressLoader from "./express";
import { mongooseLoader } from "./mongo";

class App {
    app: express.Application;
    constructor() {
        this.app = express();
        this.config();
    }

    private async loader() {
        // Load everything related to express
        expressLoader(this.app);
        // Connect to mongoose
        await mongooseLoader();
    }

    async config() {
        await this.loader();
    }
}

export default new App().app;
