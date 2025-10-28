import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', (await import('./routes/auth.route.js')).default);
app.use('/api/messages', (await import('./routes/message.route.js')).default);


let PORT = process.env.PORT || 8080;
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});