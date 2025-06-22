const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./model/User');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://projectportfolio-c4a04.web.app'
    ];
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// MongoDB Atlas connection
// mongoose.connect('mongodb+srv://shashankaggarwal13:ZO3Ne1RoHbWd2Iyz@projectdetails.myl17ww.mongodb.net/', {
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  tags: [String],
  githubLink: String,
  deployedLink: String,
  images: [String],
  date: String
});

const Project = mongoose.model('Project', projectSchema);


app.use(session({
  // secret: 'Portfolio',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport);


app.get('/', (req, res) => {
  res.send('Server is live!');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

// Check Auth
app.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});


// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


app.delete('/api/projects/remove-howtorun', async (req, res) => {
  try {
    const result = await Project.updateMany({}, { $unset: { howToRun: "" } });
    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove howToRun field from projects' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    console.log(project)
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: 'Invalid project ID' });
  }
});


app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put('/api/projects/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));