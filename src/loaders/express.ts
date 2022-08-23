import express from "express";
import config from "@/config";
import cors from "cors";
import routes from '@/api';

export default ({ app }: { app: express.Application }) => {
    /**
     * Health Check endpoints
     */
    app.get("/status", (req, res) => {
        res.status(200).end();
    });

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Transforms the raw string of req.body into json
    app.use(express.json());

    // Load API routes
    app.use(config.api.prefix, routes());

    /// catch 404 and forward to error handler
    //  TODO : Create Global Error Handler
    app.use((req, res, next) => {
        const err = new Error("Not Found");
        err["status"] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
