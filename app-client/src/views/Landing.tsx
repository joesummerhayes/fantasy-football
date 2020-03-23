import React, { useContext } from 'react';
import getPremTeam from '../data/prem-team';
import { Auth0Context } from '../contexts/auth0-context';


const Landing = () => {
  const foo = getPremTeam('5e6c0c6902654f24f473cd74');

  const { isLoading, user, loginWithRedirect, logout } = useContext(Auth0Context);

  console.log(foo);
  return (
    <div className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          {!isLoading && !user && (
            <>
              <h1>Click Below!</h1>
              <button type="button" onClick={loginWithRedirect} className="button is-danger">
                Login
              </button>
            </>
          )}
          {!isLoading && user && (
            <>
              <h1>You are logged in!</h1>
              <p>Hello {user.name}</p>

              {user.picture && <img src={user.picture} alt="My Avatar" />}
              <button
                type="button"
                onClick={() => logout({ returnTo: window.location.origin })}
                className="button is-small is-dark"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
