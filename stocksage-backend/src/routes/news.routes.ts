import express from 'express';

export const newsRoutes = express.Router();

// Mock data
const mockNews = [
  {
    id: '1',
    title: 'Apple Reports Record Q4 Earnings',
    summary: 'Apple Inc. reported record-breaking Q4 earnings, exceeding analyst expectations.',
    source: 'Bloomberg',
    url: 'https://example.com/apple-earnings',
    publishedAt: new Date().toISOString(),
    sentiment: 'positive',
    tickers: ['AAPL'],
  },
  {
    id: '2',
    title: 'Microsoft Announces New AI Features',
    summary: 'Microsoft unveils new AI-powered features for its productivity suite.',
    source: 'CNBC',
    url: 'https://example.com/microsoft-ai',
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    sentiment: 'positive',
    tickers: ['MSFT'],
  },
  {
    id: '3',
    title: 'Google Faces Antitrust Lawsuit',
    summary: 'Google parent Alphabet faces new antitrust lawsuit from US regulators.',
    source: 'Reuters',
    url: 'https://example.com/google-antitrust',
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    sentiment: 'negative',
    tickers: ['GOOGL'],
  },
];

// Get all news
newsRoutes.get('/', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;
  const ticker = req.query.ticker as string;

  let filteredNews = mockNews;
  
  if (ticker) {
    filteredNews = mockNews.filter(news => 
      news.tickers.includes(ticker.toUpperCase())
    );
  }

  const paginatedNews = filteredNews.slice(offset, offset + limit);
  
  res.json({
    news: paginatedNews,
    total: filteredNews.length,
    limit,
    offset,
  });
});

// Get news by ID
newsRoutes.get('/:id', (req, res) => {
  const news = mockNews.find(n => n.id === req.params.id);
  
  if (!news) {
    return res.status(404).json({ error: 'News article not found' });
  }
  
  res.json(news);
}); 