const sqlite3 = require('sqlite3').verbose();

// Create / Open database
const db = new sqlite3.Database('./recipes.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// ==========================
// USERS TABLE
// ==========================
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

// ==========================
// FAVORITES TABLE
// ==========================
db.run(`
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL,
    UNIQUE(user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`);

// ==========================
// REVIEWS TABLE (ADD THIS HERE)
// ==========================
db.run(`
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;
