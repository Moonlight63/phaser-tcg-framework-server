import express from 'express';

const router = express.Router();

router.post('/create', (req, res) => {
  // Logic for creating a lobby goes here
  if (req.user) {
    // Create a lobby
    // Save the lobby to the database
    // Return the lobby to the user
  } else {
    res.send("Not Logged In");
  }
});

router.post('/join', (req, res) => {
  // Logic for joining a lobby goes here
  if (req.user) {
    // Join a lobby
  } else {
    res.send("Not Logged In");
  }
});

export default router;
