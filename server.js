const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Placeholder for frontend while backend is being developed
app.get('/', (req, res) => res.send('API Running...'));

// Define routes
app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/profile', require('./routes/api/profile.js'));
app.use('/api/groups', require('./routes/api/groups.js'));

// Looks at environment variables for port. Useful when deploying to heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
