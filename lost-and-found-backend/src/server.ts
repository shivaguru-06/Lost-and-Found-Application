import express from 'express';
import cors from 'cors';

// import { initDb } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// async function startServer() {
//   try {
//     await initDb();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//   }
// }

// startServer();