import express from 'express';
import { ensureAuthenticated } from '../authentication/LocalStrategy';

const router = express.Router();

router.post('/create', ensureAuthenticated, (req, res) => {
  // Logic for creating a lobby goes here
});

router.post('/join', ensureAuthenticated, (req, res) => {
  // Logic for joining a lobby goes here
});

export default router;
