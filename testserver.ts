import express from 'express';
import { parseConfig } from './configParser';
import { ServerState } from './ServerState';

function getConfigFilePath(): string {
    const configPath = process.env["CQ_CONFIG_PATH"];
    return configPath === undefined ? "config.json" : configPath;
}

const main = async () => {
    // Parse the configuration
    const config = parseConfig(getConfigFilePath()); // Make sure to update the path

    // Initialize the server state
    const serverState = new ServerState(config);

    // Create an Express application
    const app = express();

    // Middleware: for example, to parse JSON requests
    app.use(express.json());

    // Create a router and define routes on it
    const router = express.Router();

    // Set up endpoints, using the server state where needed
    router.post('/login', (req, res) => {
        // Implement login functionality using serverState.userStorage
        // For example:
        // const user = serverState.userStorage.getUser(req.body.username);
        res.status(200).send('Login endpoint');
    });

    // Continue setting up other endpoints as needed...

    // Attach the router with the base path
    app.use(config.environmental.basePath, router);

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
