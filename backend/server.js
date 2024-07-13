const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const { execFile } = require('child_process');

require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure Multer for in-memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegStatic);

// Endpoint to handle audio file uploads and transcriptions
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioBuffer = req.file.buffer;
    const filename = req.file.originalname;
    const webmFilePath = path.join(__dirname, 'uploads', `${filename}.webm`);
    const mp3FilePath = path.join(__dirname, 'uploads', `${filename}.mp3`);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    // Save the buffer as a WEBM file
    fs.writeFileSync(webmFilePath, audioBuffer);
    // Convert WEBM to MP3 using ffmpeg
    ffmpeg(webmFilePath)
      .toFormat('mp3')
      .on('end', async () => {
        console.log('Conversion to MP3 finished:', mp3FilePath); // Log MP3 conversion finish

        try {
          // Transcribe the MP3 file using OpenAI API
          const response = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: fs.createReadStream(mp3FilePath),
            filename: `${path.parse(filename).name}.mp3`,
          });

        //   console.log('Transcription response:', response);
          console.log(response.text) // Log transcription response
          res.json({ transcription: response.text });

          // Delete the temporary files
          fs.unlinkSync(webmFilePath);
          fs.unlinkSync(mp3FilePath);
          console.log('Deleted temporary files'); // Log file deletion

        } catch (error) {
          console.error('Error during transcription:', error.message);
          res.status(500).json({ error: error.message });
        }
      })
      .on('error', (error) => {
        console.error('Error during conversion:', error.message);
        res.status(500).json({ error: 'Error converting audio to MP3.' });
      })
      .save(mp3FilePath);
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
