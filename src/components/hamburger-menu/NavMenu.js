import React from 'react';
import { useSelector } from 'react-redux';
import SignOut from '../../containers/SignOut';

import { Link } from 'react-router-dom';
import { getOpenMenu } from '../../selectors/menuSelectors';

import homeIcon from '../../images/HomeIcon.png';
import coinIcon from '../../images/CoinPageIcon.png';
import transactionIcon from '../../images/transactionIcon.png';
import styles from '../hamburger-menu/navMenu.css';


const NavMenu = () => {
  const openMenu = useSelector(getOpenMenu);

  return (
    <div className={`${styles.NavMenu} ${openMenu ? styles.open : styles.closed}`} >
      <nav>
        <Link to='/'><img src={homeIcon} /></Link>
        <Link to='/coins'><img src={coinIcon} /></Link>
        <Link to='/transaction'><img src={transactionIcon} /></Link>
        <SignOut></SignOut>
      </nav>
    </div >
  );
};

export default NavMenu;
