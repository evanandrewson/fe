import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSessionId } from '../../selectors/sessionSelectors';
import styles from '../user/User.css';

const UserForm = ({ buttonText, redirectText, redirectLink, error, handleSubmit, handleClearError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const sessionId = useSelector(getSessionId);

  if(sessionId) return <Redirect to="/" />;

  return (
    <>
      <div className={styles.Header}>
        <h1>CRYPTO</h1>
        <h1>TRADER</h1>
      </div>
      <div className={styles.Container}>
        {error && <span>{error}</span>}
        <Link to={redirectLink} onClick={() => handleClearError()}>{redirectText}</Link>
        <form onSubmit={event => handleSubmit(event, username, password)} className={styles.Form}>
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
          <button>{buttonText}</button>
        </form>
      </div>
    </>
  );
};

UserForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  redirectText: PropTypes.string.isRequired,
  redirectLink: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleClearError: PropTypes.func.isRequired
};

export default UserForm;

