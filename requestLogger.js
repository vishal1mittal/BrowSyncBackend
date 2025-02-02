const fs = require("fs");
const path = require("path");

// Middleware to log requests
function requestLogger(req, res, next) {
    const logFilePath = path.join(__dirname, "requests.log");

    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        method: req.method,
        route: req.originalUrl,
        body: req.body,
        headers: req.headers,
    };

    const logMessage = JSON.stringify(logEntry, null, 2) + "\n";

    // Append log to file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error("Failed to write log:", err);
        }
    });

    console.log("Request Logged:", logEntry);
    next();
}

module.exports = requestLogger;
