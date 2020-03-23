import React, { useContext, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import getPremTeam from '../data/prem-team';
import { useAuth0 } from '../contexts/auth0-context';
import * as actions from '../actions';

interface Props {
  saveUser?: (user: FFType.User) => Promise<void>;
  getPremTeams?: (user: FFType.User) => Promise<void>;
  user?: FFType.User;
}

const Landing: React.FC<Props> = (props: Props) => {
  console.log(props);

  const foo = getPremTeam('5e6c0c6902654f24f473cd74');

  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    const { saveUser } = props;
    if (saveUser) saveUser(user);
    console.log('mount it!');
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

const mapStateToProps = (state: FFType.AppState): FFType.AppState => state;

export default connect(mapStateToProps, actions)(Landing);
