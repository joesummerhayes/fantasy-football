import React, { useContext, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useAuth0 } from '../contexts/auth0-context';
import * as actions from '../actions';
import { AppState } from '../app-state';

interface Props {
  saveUser?: (user: FFType.User) => Promise<void>;
  getPremTeams?: (user: FFType.User) => Promise<void>;
  user?: FFType.User;
}

const Landing: React.FC<Props> = (props: Props) => {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    const { saveUser } = props;
    console.log('1111', user);
    if (saveUser && user) saveUser(user);
  }, [user]);

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
              <p>Hello  {user.name}</p>

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

const mapStateToProps = (state: AppState): AppState => state;

export default connect(mapStateToProps, actions)(Landing);
