const bcrypt = require("bcryptjs");
const db = require("../db");

// Auth middleware -> The user sends their username:password with every request(encoded in the header)
async function basicAuth(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Login required. Use Basic Auth." });
    }

    // Decode the base64 "username:password" string
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    try {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Compare the sent password against the hashed one in the database
        const match = await bcrypt.compare(password, rows[0].password);

        if (!match) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Save user info so the logger can access it
        req.user = rows[0];

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error during authentication" });
    }
}

module.exports = basicAuth;

