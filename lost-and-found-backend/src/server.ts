import express from 'express';
import cors from 'cors';
import appRoutes from './routes/appRoutes';
import lostItemRoutes from './routes/lostItemRoutes';
// import { initDb } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', lostItemRoutes);
app.use('/', appRoutes);

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