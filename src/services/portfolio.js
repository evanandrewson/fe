import { get, put } from './request';
const PORTFOLIO_BASE_URL = 'http://localhost:7891/api/v1/portfolio';

export const fetchPortfolio = () => get(`${PORTFOLIO_BASE_URL}`);
export const changeWatchList = (watchList, coin) => {
  if(watchList.find(element => element.name === coin)) {
    const index = watchList.indexOf({ name: coin });
    watchList.splice(index, 1);
  } else {
    watchList.push({ name: coin });
  }
  return put(`${PORTFOLIO_BASE_URL}`, { watchList });
};