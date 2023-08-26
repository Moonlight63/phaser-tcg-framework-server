import express from 'express';
import session from 'express-session';
import { parseConfig } from './configParser';
import * as ServerState from './ServerState';
import AuthRouter from './authentication/AuthRouter';
import passport from 'passport';

function getConfigFilePath(): string {
    const configPath = process.env["CQ_CONFIG_PATH"];
    return configPath === undefined ? "config.json" : configPath;
}

const main = async () => {
    // Parse the configuration
    const config = parseConfig(getConfigFilePath()); // Make sure to update the path

    // Initialize the server state
    console.log("Initializing server state...");
    await ServerState.CreateState(config);
    console.log("Server state initialized.");

    // Create an Express application
    const app = express();

    // Middleware: for example, to parse JSON requests
    app.use(express.json());

    // Middleware: session
    console.log("Getting session store...");
    // console.log("🚀 ~ file: testserver.ts:31 ~ main ~ ServerState:", ServerState)
    // console.log("🚀 ~ file: testserver.ts:31 ~ main ~ SessionStorage:", ServerState.SessionStorage)
    const store = ServerState.SessionStorage().getStore();
    console.log("Session store obtained.");

    app.use(session({
        secret: config.environmental.secret,
        store: store,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
        },
    }));

    // Initialize Passport and restore authentication state, if any, from the session.
    app.use(passport.authenticate('session'));

    app.use('/', AuthRouter);

    passport.serializeUser(function (user: any, cb) {
        console.log(user);

        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function (user: any, cb) {
        console.log("🚀 ~ file: testserver.ts:59 ~ user:", user)
        process.nextTick(function () {
            return cb(null, user);
        });
    });

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
