import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NetWorth from '../components/net-worth/NetWorth';
import AssetList from '../components/ourAssets/AssetList';
import NavMenu from '../components/hamburger-menu/NavMenu';

import { getPortfolio } from '../actions/portfolioActions';
import { getNetWorth, getPortfolioInvestedCoins } from '../selectors/portfolioSelectors';
import { getInvestedList } from '../services/currencies';


const Portfolio = ({ netWorth, loadPortfolio, portfolioInvestedCoins }) => {
  const [investedCoins, setInvestedCoins] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);
  
  useEffect(() => {
    getInvestedList()
      .then(coins => {
        setInvestedCoins(coins.map(coin => {
          const portCoin = portfolioInvestedCoins.find(element => element.name === coin.id);
          return {
            id: coin.id,
            logo: coin.currencySymbol,
            name: coin.name,
            amount: portCoin ? portCoin.amount : null,
            price: coin.priceUsd
          };
        }));
      });
  }, [portfolioInvestedCoins]);

  return (
    <div>
      <NetWorth netWorth={netWorth} />
      {//net worth chart
        //diversification chart
      }
      <AssetList investedCoins={investedCoins} />
      <NavMenu />
    </div>
  );
};

Portfolio.propTypes = {
  netWorth: PropTypes.number.isRequired,
  portfolioInvestedCoins: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  loadPortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  netWorth: getNetWorth(state),
  portfolioInvestedCoins: getPortfolioInvestedCoins(state)
});

const mapDispatchToProps = dispatch => ({
  loadPortfolio() {
    dispatch(getPortfolio());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);


