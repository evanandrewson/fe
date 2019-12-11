import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NetWorth from '../components/net-worth/NetWorth';
import HamburgerMenu from '../components/hamburger-menu/NavMenu';
import CoinList from '../components/coin-summary/CoinList';
import CoinSearchForm from '../components/coin-search/CoinSearchForm';
import { getNetWorth, getWatchList } from '../selectors/portfolioSelectors';
import { getStateSearchedList } from '../selectors/coinsSelectors';
import { getTop100Currencies } from '../services/currencies';
import { getSearchedList, CLEAR_SEARCHED_LIST } from '../actions/coinsActions';
import styles from './AllCoins.css';

const AllCoins = ({ netWorth, portfolioWatchList, searchedList, handleSubmit, clearSearch }) => {
  const [watchList, setWatchList] = useState([]);
  const [investedCoins, setInvestedCoins] = useState([]);
  const [top100Coins, setTop100Coins] = useState([]);


  useEffect(() => {
    getTop100Currencies()
      .then(({ watchList, investedCoins, top100Coins }) => {
        setWatchList(watchList);
        setInvestedCoins(investedCoins);
        setTop100Coins(modifiedTop100(top100Coins, watchList, investedCoins));
      });
  }, [portfolioWatchList]);

  return (
    <>
      <NetWorth netWorth={netWorth} />
      <div className={styles.AllCoins}>

        {searchedList.length !== 0 && 
        <>
          <h1>Search Results</h1>
          <button onClick={()=> clearSearch()}>Clear Search Results</button>
          <CoinList items={searchedList} />
        </>
        }
        <h1>Invested Coins</h1>
        <CoinList items={coinListNeeds(investedCoins)} />
        <h1>Watched Coins</h1>
        {watchList.length !== 0 && <CoinList items={coinListNeeds(watchList)} />}
        <CoinSearchForm handleSubmit={handleSubmit}/>
        <h1>All Coins</h1>
        <CoinList items={coinListNeeds(top100Coins)} />
      </div>
      <HamburgerMenu />
    </>
  );
};

AllCoins.propTypes = {
  netWorth: PropTypes.number.isRequired,
  portfolioWatchList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  searchedList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    logo: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    changePercent24Hr: PropTypes.string.isRequired
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  netWorth: getNetWorth(state),
  portfolioWatchList: getWatchList(state),
  searchedList: getStateSearchedList(state)
});

const mapDispatchToProps = dispatch => ({
  handleSubmit(event, query) {
    event.preventDefault();
    dispatch(getSearchedList(query));
  },
  clearSearch() {
    dispatch({ type: CLEAR_SEARCHED_LIST });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCoins);

function coinListNeeds(array) {
  return array.map(coin => ({
    id: coin.id,
    logo: coin.currencySymbol,
    name: coin.name,
    price: coin.priceUsd,
    changePercent24Hr: coin.changePercent24Hr
  }));
}

function modifiedTop100(top100Coins, watchList, investedCoins) {
  const lookup = top100Coins.reduce((acc, coin) => {
    acc = {
      ...acc,
      [coin.id]: { ...coin, special: null }
    };
    return acc;
  }, {});

  watchList.forEach(watchCoin => {
    if(lookup[watchCoin.id]) lookup[watchCoin.id].special = 'watched';
  });
  investedCoins.forEach(investedCoin => {
    if(lookup[investedCoin.id]) lookup[investedCoin.id].special = 'invested';
  });

  return Object.values(lookup);
}