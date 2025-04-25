import express from 'express';

export const portfolioRoutes = express.Router();

// Mock data
const mockPortfolios = [
  {
    id: '1',
    userId: 'user1',
    name: 'Tech Portfolio',
    stocks: [
      {
        symbol: 'AAPL',
        shares: 10,
        averagePrice: 150.25,
        currentPrice: 175.50,
      },
      {
        symbol: 'MSFT',
        shares: 5,
        averagePrice: 300.00,
        currentPrice: 315.25,
      },
    ],
    totalValue: 3000.25,
    dailyChange: 125.50,
    dailyChangePercent: 4.2,
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Dividend Portfolio',
    stocks: [
      {
        symbol: 'JNJ',
        shares: 20,
        averagePrice: 160.00,
        currentPrice: 165.75,
      },
      {
        symbol: 'PG',
        shares: 15,
        averagePrice: 140.00,
        currentPrice: 145.25,
      },
    ],
    totalValue: 5000.75,
    dailyChange: 75.25,
    dailyChangePercent: 1.5,
  },
];

// Get all portfolios for a user
portfolioRoutes.get('/', (req, res) => {
  const userId = req.query.userId as string;
  
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const userPortfolios = mockPortfolios.filter(p => p.userId === userId);
  res.json(userPortfolios);
});

// Get portfolio by ID
portfolioRoutes.get('/:id', (req, res) => {
  const portfolio = mockPortfolios.find(p => p.id === req.params.id);
  
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }
  
  res.json(portfolio);
});

// Create new portfolio
portfolioRoutes.post('/', (req, res) => {
  const { userId, name } = req.body;
  
  if (!userId || !name) {
    return res.status(400).json({ error: 'UserId and name are required' });
  }

  const newPortfolio = {
    id: (mockPortfolios.length + 1).toString(),
    userId,
    name,
    stocks: [],
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
  };

  mockPortfolios.push(newPortfolio);
  res.status(201).json(newPortfolio);
});

// Add stock to portfolio
portfolioRoutes.post('/:id/stocks', (req, res) => {
  const portfolio = mockPortfolios.find(p => p.id === req.params.id);
  
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  const { symbol, shares, price } = req.body;
  
  if (!symbol || !shares || !price) {
    return res.status(400).json({ error: 'Symbol, shares, and price are required' });
  }

  portfolio.stocks.push({
    symbol,
    shares,
    averagePrice: price,
    currentPrice: price,
  });

  res.json(portfolio);
}); 