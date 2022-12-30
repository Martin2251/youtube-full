import express, { Express } from "express";
import logger from "./ultis/logger";

const PORT = process.env.PORT || 4000;

const app = express ();

const server = app.listen(PORT, () => {
    logger.info(`server listening at http://localhost:${PORT}`)
});

const signals = ["SIGTERM", "SIGINT"]


const gracefulShutdown = (signal:string) => {
process.on(signal, async () => {
    logger.info("Goodbye, got signal", signal);
    server.close()

    // disconnect from db

    logger.info("My work here is done")

    process.exit(0);
})
}
 

//loop through all the signals we will do a graceful shut down function 

for (let i =0; i < signals.length; i ++){
    gracefulShutdown(signals[i])
}