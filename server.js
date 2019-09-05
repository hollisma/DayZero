const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOption));

// uncomment after putting favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/public/index.html"), function (err) {
	if (err) {
	    res.status(500).send(err);
	}
    };
});

// Define routes
app.use("/api/auth", require("./routes/api/auth.js"));
app.use("/api/users", require("./routes/api/users.js"));
app.use("/api/profile", require("./routes/api/profile.js"));
app.use("/api/schedule", require("./routes/api/schedule.js"));
app.use("/api/groups", require("./routes/api/groups.js"));
app.use("/api/feedback", require("./routes/api/feedback.js"));

// Looks at environment variables for port. Useful when deploying to heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
