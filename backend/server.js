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


const mongoose = require('mongoose');
const User = require('./models/User')
const Transcripts = require('./models/Transcripts')

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://haripriya01212:<password>@fsd.m0l4kny.mongodb.net/?retryWrites=true&w=majority&appName=fsd').then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));


// -------------------------------------------------------------------------------------------------------------------
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


// Endpoint to handle MP3 file uploads and transcriptions
app.post('/transcribe-mp3', upload.single('audio'), async (req, res) => {
  try {
    const audioBuffer = req.file.buffer;
    const filename = req.file.originalname;
    const mp3FilePath = path.join(__dirname, 'uploads', filename);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    // Save the buffer as an MP3 file
    fs.writeFileSync(mp3FilePath, audioBuffer);

    try {
      // Transcribe the MP3 file using OpenAI API
      const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(mp3FilePath),
        filename: filename,
      });

      console.log(response.text) // Log transcription response
      res.json({ transcription: response.text });

      // Delete the temporary file
      fs.unlinkSync(mp3FilePath);
      console.log('Deleted temporary file'); // Log file deletion

    } catch (error) {
      console.error('Error during transcription:', error.message);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//----------------------------------------------------------------------------------------------------------------------------

//mongodb+srv://haripriya01212:<password>@fsd.m0l4kny.mongodb.net/?retryWrites=true&w=majority&appName=fsd

// endpoint to signup
app.post('/signup', async(req, res) => {
  try {
    const { username, email, password } = req.body;
    // const userDoc = await User.create({ username, email, password: bcrypt.hashSync(password, salt), selectedTopics });
    const userDoc = await User.create({ username, email, password });
    res.json(userDoc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})



// endpoint to login
app.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with the given username
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, send error response
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If credentials are correct, send success response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
})


// Endpoint to save a transcript
app.post('/save-transcript', async (req, res) => {
  const { userId, transcript } = req.body;

  if (!userId || !transcript) {
    return res.status(400).json({ error: 'User ID and transcript text are required' });
  }

  try {
    const transcriptData = await Transcripts.create({userId, transcript, createdAt: new Date()});

    res.status(201).json({ message: 'Transcript saved successfully', transcript: transcriptData });
  } catch (error) {
    res.status(500).json({ error: 'Error saving transcript', details: error.message });
  }
});



// endpoint to fetch history
app.get('/transcripts', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const transcripts = await Transcripts.find({ userId: userId });
    res.status(200).json(transcripts);
  } catch (error) {
    console.error('Error fetching transcripts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
