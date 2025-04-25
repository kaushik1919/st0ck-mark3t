# StockSage - Stock Market Analysis and Learning Platform

StockSage is a comprehensive platform for stock market analysis, learning, and portfolio management. It provides users with real-time market data, educational resources, and personalized stock recommendations.
 
## Features

- **Market Overview**: Real-time market data and trends
- **Stock Recommendations**: AI-powered stock recommendations based on multiple factors
- **Portfolio Management**: Track and manage your investments
- **Watchlist**: Monitor stocks of interest
- **Learning Resources**: Educational content for beginners and advanced traders
- **News Integration**: Latest market news and analysis

## Tech Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive charts and graphs
- **Supabase**: Authentication and database

### Backend
- **Python**: Core recommendation engine
- **FastAPI**: Modern, fast web framework for building APIs
- **NumPy/Pandas**: Data analysis and manipulation
- **TypeScript/Node.js**: Additional API endpoints
- **Express**: Web application framework

## Project Structure

```
stocksage/
├── app/                    # Next.js frontend application
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── stocksage-backend/     # Python backend
│   ├── src/
│   │   ├── recommendations/  # Stock recommendation engine
│   │   ├── routes/          # API endpoints
│   │   └── server.py        # FastAPI server
│   └── requirements.txt     # Python dependencies
└── README.md
```

## Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stocksage.git
cd stocksage
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
```

4. Run the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd stocksage-backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the FastAPI server:
```bash
uvicorn src.server:app --reload
```

## API Endpoints

### Stock Recommendations
- `GET /api/recommendations`: Get personalized stock recommendations
  - Query parameters:
    - `risk_tolerance`: low/medium/high
    - `investment_style`: value/growth/balanced
    - `num_recommendations`: number of stocks to return

- `GET /api/sector-recommendations/{sector}`: Get sector-specific recommendations

### Stock Data
- `GET /api/stocks`: Get all stocks
- `GET /api/stocks/{symbol}`: Get stock by symbol
- `GET /api/stocks/{symbol}/historical`: Get historical data

### News
- `GET /api/news`: Get latest market news
- `GET /api/news/{id}`: Get specific news article

### Portfolio
- `GET /api/portfolio`: Get user portfolios
- `POST /api/portfolio`: Create new portfolio
- `GET /api/portfolio/{id}`: Get portfolio by ID

### Watchlist
- `GET /api/watchlist`: Get user watchlists
- `POST /api/watchlist`: Create new watchlist
- `GET /api/watchlist/{id}`: Get watchlist by ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for stock market data
- [Supabase](https://supabase.io/) for authentication and database
- [Chart.js](https://www.chartjs.org/) for data visualization 
