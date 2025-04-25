import express from 'express';

export const watchlistRoutes = express.Router();

// Mock data
const mockWatchlists = [
  {
    id: '1',
    userId: 'user1',
    name: 'Tech Stocks',
    stocks: [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.50,
        change: 2.35,
        changePercent: 1.36,
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 315.25,
        change: -1.15,
        changePercent: -0.36,
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 142.75,
        change: 3.42,
        changePercent: 2.45,
      },
    ],
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Dividend Stocks',
    stocks: [
      {
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        price: 165.75,
        change: 0.75,
        changePercent: 0.45,
      },
      {
        symbol: 'PG',
        name: 'Procter & Gamble',
        price: 145.25,
        change: -0.25,
        changePercent: -0.17,
      },
    ],
  },
];

// Get all watchlists for a user
watchlistRoutes.get('/', (req, res) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const userWatchlists = mockWatchlists.filter(w => w.userId === userId);
  res.json(userWatchlists);
});

// Get watchlist by ID
watchlistRoutes.get('/:id', (req, res) => {
  const watchlist = mockWatchlists.find(w => w.id === req.params.id);
  
  if (!watchlist) {
    return res.status(404).json({ error: 'Watchlist not found' });
  }
  
  res.json(watchlist);
});

// Create new watchlist
watchlistRoutes.post('/', (req, res) => {
  const { userId, name } = req.body;
  
  if (!userId || !name) {
    return res.status(400).json({ error: 'UserId and name are required' });
  }

  const newWatchlist = {
    id: (mockWatchlists.length + 1).toString(),
    userId,
    name,
    stocks: [],
  };

  mockWatchlists.push(newWatchlist);
  res.status(201).json(newWatchlist);
});

// Add stock to watchlist
watchlistRoutes.post('/:id/stocks', (req, res) => {
  const watchlist = mockWatchlists.find(w => w.id === req.params.id);
  
  if (!watchlist) {
    return res.status(404).json({ error: 'Watchlist not found' });
  }

  const { symbol, name, price, change, changePercent } = req.body;
  
  if (!symbol || !name || !price || !change || !changePercent) {
    return res.status(400).json({ error: 'All stock fields are required' });
  }

  watchlist.stocks.push({
    symbol,
    name,
    price,
    change,
    changePercent,
  });

  res.json(watchlist);
});

// Remove stock from watchlist
watchlistRoutes.delete('/:id/stocks/:symbol', (req, res) => {
  const watchlist = mockWatchlists.find(w => w.id === req.params.id);
  
  if (!watchlist) {
    return res.status(404).json({ error: 'Watchlist not found' });
  }

  const symbol = req.params.symbol.toUpperCase();
  const initialLength = watchlist.stocks.length;
  
  watchlist.stocks = watchlist.stocks.filter(s => s.symbol !== symbol);
  
  if (watchlist.stocks.length === initialLength) {
    return res.status(404).json({ error: 'Stock not found in watchlist' });
  }

  res.json(watchlist);
}); 