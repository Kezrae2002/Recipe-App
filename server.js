const express = require('express');
const bcrypt = require('bcrypt'); // for hashing passwords
const cors = require('cors');
const db = require('./database');
const path = require("path"); 

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies




// --- SIGNUP ROUTE ---
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, hashedPassword],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ message: "Email already exists." });
                    }
                    return res.status(500).json({ message: err.message });
                }
                return res.status(201).json({ message: "User registered!", userId: this.lastID });
            }
        );
    } catch (err) {
        res.status(500).json({ message: "Error creating user.", error: err });
    }
});

// --- LOGIN ROUTE (name + email + password) ---
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        async (err, row) => {
            if (err) return res.status(500).json({ message: err.message });

            if (!row) return res.status(400).json({ message: "Invalid credentials." });

            const match = await bcrypt.compare(password, row.password);
            if (!match) return res.status(400).json({ message: "Invalid credentials." });

            return res.json({ 
                message: "Login successful!", 
                userId: row.id, 
                name: row.name 
            });
        }
    );
});

// =============================
// ADD REVIEW (POST)
// =============================
app.post("/api/reviews", (req, res) => {
  const { recipe_id, name, rating, review } = req.body;

  const sql = `
    INSERT INTO reviews (recipe_id, name, rating, review)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [recipe_id, name, rating, review], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true, id: this.lastID });
  });
});

// =============================
// GET REVIEWS
// =============================
app.get("/api/reviews/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;

  const sql = `
    SELECT * FROM reviews
    WHERE recipe_id = ?
    ORDER BY created_at DESC
  `;

  db.all(sql, [recipeId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const totalReviews = rows.length;

    const average =
      totalReviews === 0
        ? 0
        : (rows.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

    res.json({
      average,
      totalReviews,
      reviews: rows
    });
  });
});


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
