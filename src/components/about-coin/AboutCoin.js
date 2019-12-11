import React from 'react';
import PropTypes from 'prop-types';

//todo - maybe add info about volume, market cap, etc.

const AboutCoin = ({ website, description }) => {
  return (
    <div>
      <a target='_blank' rel="noopener noreferrer" href={website}>Coin`&apos;`s website</a>
      <p>{description}</p>
    </div>
  );
};

AboutCoin.propTypes = {
  website: PropTypes.string,
  description: PropTypes.string
};

export default AboutCoin;
