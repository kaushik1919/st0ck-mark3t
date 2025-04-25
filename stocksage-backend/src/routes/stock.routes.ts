import express from 'express';

export const stockRoutes = express.Router();

// Mock data
const mockStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.50,
    change: 2.35,
    changePercent: 1.36,
    volume: 45200000,
    marketCap: 2750000000000,
    peRatio: 28.5,
    dividendYield: 0.5,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 315.25,
    change: -1.15,
    changePercent: -0.36,
    volume: 32800000,
    marketCap: 2340000000000,
    peRatio: 32.1,
    dividendYield: 0.8,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.75,
    change: 3.42,
    changePercent: 2.45,
    volume: 18500000,
    marketCap: 1780000000000,
    peRatio: 24.8,
    dividendYield: 0.0,
  },
];

// Get all stocks
stockRoutes.get('/', (req, res) => {
  res.json(mockStocks);
});

// Get stock by symbol
stockRoutes.get('/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = mockStocks.find(s => s.symbol === symbol);
  
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }
  
  res.json(stock);
});

// Get stock historical data
stockRoutes.get('/:symbol/historical', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const days = parseInt(req.query.days as string) || 30;
  
  // Generate mock historical data
  const historicalData = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      open: Math.random() * 100 + 100,
      high: Math.random() * 100 + 100,
      low: Math.random() * 100 + 100,
      close: Math.random() * 100 + 100,
      volume: Math.floor(Math.random() * 1000000),
    };
  }).reverse();

  res.json(historicalData);
}); 