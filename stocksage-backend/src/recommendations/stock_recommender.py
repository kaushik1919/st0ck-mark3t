import numpy as np
import pandas as pd
from typing import List, Dict, Any
from datetime import datetime, timedelta

class StockRecommender:
    def __init__(self):
        # Mock stock data - in a real implementation, this would come from a database or API
        self.stocks = [
            {
                'symbol': 'AAPL',
                'name': 'Apple Inc.',
                'sector': 'Technology',
                'market_cap': 2.75e12,
                'pe_ratio': 28.5,
                'dividend_yield': 0.5,
                'beta': 1.2,
                'volatility': 0.25,
                'momentum_score': 0.8,
                'sentiment_score': 0.7,
                'volume': 45200000,
                'price': 175.50,
                'change': 2.35,
                'change_percent': 1.36
            },
            {
                'symbol': 'MSFT',
                'name': 'Microsoft Corporation',
                'sector': 'Technology',
                'market_cap': 2.34e12,
                'pe_ratio': 32.1,
                'dividend_yield': 0.8,
                'beta': 1.1,
                'volatility': 0.22,
                'momentum_score': 0.75,
                'sentiment_score': 0.8,
                'volume': 32800000,
                'price': 315.25,
                'change': -1.15,
                'change_percent': -0.36
            },
            {
                'symbol': 'GOOGL',
                'name': 'Alphabet Inc.',
                'sector': 'Technology',
                'market_cap': 1.78e12,
                'pe_ratio': 24.8,
                'dividend_yield': 0.0,
                'beta': 1.3,
                'volatility': 0.28,
                'momentum_score': 0.85,
                'sentiment_score': 0.65,
                'volume': 18500000,
                'price': 142.75,
                'change': 3.42,
                'change_percent': 2.45
            },
            {
                'symbol': 'JNJ',
                'name': 'Johnson & Johnson',
                'sector': 'Healthcare',
                'market_cap': 450e9,
                'pe_ratio': 15.2,
                'dividend_yield': 2.8,
                'beta': 0.7,
                'volatility': 0.18,
                'momentum_score': 0.6,
                'sentiment_score': 0.75,
                'volume': 12500000,
                'price': 165.75,
                'change': 0.75,
                'change_percent': 0.45
            },
            {
                'symbol': 'PG',
                'name': 'Procter & Gamble',
                'sector': 'Consumer Staples',
                'market_cap': 380e9,
                'pe_ratio': 26.3,
                'dividend_yield': 2.4,
                'beta': 0.5,
                'volatility': 0.15,
                'momentum_score': 0.55,
                'sentiment_score': 0.7,
                'volume': 9500000,
                'price': 145.25,
                'change': -0.25,
                'change_percent': -0.17
            }
        ]

    def calculate_risk_score(self, stock: Dict[str, Any]) -> float:
        """Calculate a risk score based on beta and volatility"""
        return (stock['beta'] * 0.6 + stock['volatility'] * 0.4)

    def calculate_value_score(self, stock: Dict[str, Any]) -> float:
        """Calculate a value score based on P/E ratio and dividend yield"""
        # Normalize P/E ratio (lower is better)
        pe_score = 1 - (stock['pe_ratio'] / 50) if stock['pe_ratio'] < 50 else 0
        # Normalize dividend yield (higher is better)
        div_score = min(stock['dividend_yield'] / 5, 1)
        return (pe_score * 0.6 + div_score * 0.4)

    def calculate_growth_score(self, stock: Dict[str, Any]) -> float:
        """Calculate a growth score based on momentum and sentiment"""
        return (stock['momentum_score'] * 0.6 + stock['sentiment_score'] * 0.4)

    def get_recommendations(self, 
                          risk_tolerance: str = 'medium',
                          investment_style: str = 'balanced',
                          num_recommendations: int = 5) -> List[Dict[str, Any]]:
        """
        Generate stock recommendations based on user preferences
        
        Args:
            risk_tolerance: 'low', 'medium', or 'high'
            investment_style: 'value', 'growth', or 'balanced'
            num_recommendations: number of stocks to recommend
            
        Returns:
            List of recommended stocks with scores
        """
        # Convert risk tolerance to weight
        risk_weights = {
            'low': 0.2,
            'medium': 0.5,
            'high': 0.8
        }
        
        # Convert investment style to weights
        style_weights = {
            'value': {'value': 0.6, 'growth': 0.2, 'risk': 0.2},
            'growth': {'value': 0.2, 'growth': 0.6, 'risk': 0.2},
            'balanced': {'value': 0.4, 'growth': 0.4, 'risk': 0.2}
        }
        
        # Calculate scores for each stock
        recommendations = []
        for stock in self.stocks:
            risk_score = self.calculate_risk_score(stock)
            value_score = self.calculate_value_score(stock)
            growth_score = self.calculate_growth_score(stock)
            
            # Calculate overall score based on weights
            weights = style_weights[investment_style]
            overall_score = (
                value_score * weights['value'] +
                growth_score * weights['growth'] +
                (1 - risk_score) * weights['risk']
            )
            
            recommendations.append({
                'symbol': stock['symbol'],
                'name': stock['name'],
                'sector': stock['sector'],
                'price': stock['price'],
                'change_percent': stock['change_percent'],
                'score': round(overall_score * 100, 2),
                'risk_score': round(risk_score * 100, 2),
                'value_score': round(value_score * 100, 2),
                'growth_score': round(growth_score * 100, 2)
            })
        
        # Sort by overall score and return top recommendations
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:num_recommendations]

    def get_sector_recommendations(self, sector: str, num_recommendations: int = 3) -> List[Dict[str, Any]]:
        """
        Get recommendations for a specific sector
        
        Args:
            sector: Sector to filter by
            num_recommendations: Number of stocks to recommend
            
        Returns:
            List of recommended stocks in the sector
        """
        sector_stocks = [s for s in self.stocks if s['sector'].lower() == sector.lower()]
        if not sector_stocks:
            return []
            
        recommendations = []
        for stock in sector_stocks:
            score = (
                self.calculate_value_score(stock) * 0.4 +
                self.calculate_growth_score(stock) * 0.4 +
                (1 - self.calculate_risk_score(stock)) * 0.2
            )
            
            recommendations.append({
                'symbol': stock['symbol'],
                'name': stock['name'],
                'price': stock['price'],
                'change_percent': stock['change_percent'],
                'score': round(score * 100, 2)
            })
        
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:num_recommendations]

# Example usage
if __name__ == "__main__":
    recommender = StockRecommender()
    
    # Get general recommendations
    print("General Recommendations:")
    for stock in recommender.get_recommendations(risk_tolerance='medium', investment_style='balanced'):
        print(f"{stock['symbol']}: {stock['name']} - Score: {stock['score']}")
    
    # Get sector-specific recommendations
    print("\nTechnology Sector Recommendations:")
    for stock in recommender.get_sector_recommendations('Technology'):
        print(f"{stock['symbol']}: {stock['name']} - Score: {stock['score']}") 