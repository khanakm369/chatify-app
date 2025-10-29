import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api/auth', (await import('./routes/auth.route.js')).default);
app.use('/api/messages', (await import('./routes/message.route.js')).default);


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

let PORT = process.env.PORT || 8080;
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});