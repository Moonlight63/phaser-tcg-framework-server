import express from 'express';

const router = express.Router();

import { Lobby } from './lobby';
import { LobbyStorage } from '../ServerState';

const lobbyStorage = LobbyStorage();

router.post('/create', async (req, res) => {
  if (req.user) {
    const lobby = await Lobby.createLobby(req.user.id, req.body);
    await lobbyStorage.setLobby(lobby);
    res.json(lobby);
  } else {
    res.status(401).send("Not Logged In");
  }
});

router.post('/join', async (req, res) => {
  if (req.user && req.body.lobbyId) {
    const lobby = await lobbyStorage.getLobby(req.body.lobbyId);
    if (lobby) {
      lobby.addUser(req.user.id);
      await lobbyStorage.setLobby(lobby);
      res.json(lobby);
    } else {
      res.status(404).send("Lobby not found");
    }
  } else {
    res.status(401).send("Not Logged In");
  }
});

export default router;
