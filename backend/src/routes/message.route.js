import express from 'express';

const router = express.Router();

// Mock authentication controller

router.get("/send", (req, res) => {
  res.send('Send Messages Endpoint');
} );

router.get("/receive", (req, res) => {
  res.send('Post Message Endpoint');
});


export default router;

