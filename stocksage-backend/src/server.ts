import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { stockRoutes } from './routes/stock.routes';
import { newsRoutes } from './routes/news.routes';
import { portfolioRoutes } from './routes/portfolio.routes';
import { watchlistRoutes } from './routes/watchlist.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 