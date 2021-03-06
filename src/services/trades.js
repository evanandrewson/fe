import { post, get } from './request';
import { baseUrl } from './dbUrl';
export const TRADE_BASE_URL = `${baseUrl}/api/v1/trade`;


export const addTrade = (toCurrency, toCurrencyAmount, fromCurrency, fromCurrencyAmount, exchangeRate) => {
  
  const trade = { 
    from_currency: { 
      name: fromCurrency, 
      amount: fromCurrencyAmount 
    }, 
    to_currency: { 
      name: toCurrency, 
      amount: toCurrencyAmount 
    }, 
    exchange_rate: exchangeRate 
  };
  
  return post(`${TRADE_BASE_URL}`, trade);
};

export const getTrades = () => {
  return get(TRADE_BASE_URL);
};
