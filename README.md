# StockSage

StockSage is a modern web application for stock market analysis and learning. It provides users with real-time stock data, market insights, and educational resources to help them make informed investment decisions.

## Features

- 📊 **Market Overview**: Real-time market data and trends
- 📈 **Stock Recommendations**: AI-powered stock suggestions
- 📱 **Watchlist**: Track your favorite stocks
- 📚 **Learning Resources**: Educational content for investors
- 📰 **News Feed**: Latest stock market news and updates
- 🔐 **User Authentication**: Secure sign-up and login
- 💼 **Portfolio Tracking**: Monitor your investments

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Charts**: Chart.js
- **API**: Alpha Vantage (for stock data)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Alpha Vantage API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stocksage.git
   cd stocksage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
stocksage/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── explore/           # Stock exploration
│   ├── learn/             # Learning resources
│   ├── news/              # News section
│   ├── portfolio/         # Portfolio management
│   └── watchlist/         # Watchlist management
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── styles/              # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Alpha Vantage](https://www.alphavantage.co/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Chart.js](https://www.chartjs.org/) 