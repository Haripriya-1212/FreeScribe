const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(upload.single());

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure Multer for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint to handle audio file uploads and transcriptions
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  const audioBuffer = req.file.buffer;

  try {
    const response = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file: audioBuffer,
      filename: req.file.originalname,
    });

    res.json({ transcription: response.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
