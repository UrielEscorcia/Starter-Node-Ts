import "reflect-metadata";
import App from "./bootstrap";
import { config } from "./config";
import { initializeHealthCheck } from "./bootstrap/health";

const port = config.port || 8080;

const server = App.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${config.port}`);
    initializeHealthCheck(server);
});
