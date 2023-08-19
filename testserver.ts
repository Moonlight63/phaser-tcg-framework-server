import express from 'express';
import { parseConfig } from './configParser';
import * as ServerState from './ServerState';
import localStrategyRouter from './authentication/LocalStrategy';

function getConfigFilePath(): string {
    const configPath = process.env["CQ_CONFIG_PATH"];
    return configPath === undefined ? "config.json" : configPath;
}

const main = async () => {
    // Parse the configuration
    const config = parseConfig(getConfigFilePath()); // Make sure to update the path

    // Initialize the server state
    ServerState.CreateState(config);

    // Create an Express application
    const app = express();

    // Middleware: for example, to parse JSON requests
    app.use(express.json());

    // Use the local strategy router as a subrouter under the '/login/local' path
    app.use('/login/local', localStrategyRouter);

    // Start listening
    const port = typeof config.environmental.listenOn === 'number'
        ? config.environmental.listenOn
        : parseInt(config.environmental.listenOn, 10);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}${config.environmental.basePath}`);
    });
};

main().catch(err => {
    console.error('Error starting server:', err);
});
