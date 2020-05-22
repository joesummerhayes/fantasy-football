import auth0 from 'auth0-js';

export default class Auth {
  // Please use your own credentials here
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: 'http://localhost:3000/callback',
    // redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://appbaseio-apps.github.io/reactivesearch-auth0-example/callback',
    // audience: 'https://divyanshu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });

  login = () => {
    try {
      console.log('poo')
      this.auth0.authorize();
    }
    catch(e){
      console.log(e)
    }
  }

  // parses the result after authentication from URL hash
  handleAuthentication = () => {
    console.log('handleAuthentication')
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult)
        this.setSession(authResult);
        // history.replace('/home');
      } else if (err) {
        // history.replace('/home');
        console.log(err);
      }
    });
  }

  // Sets user details in localStorage
  setSession = (authResult) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // history.replace('/home');
  }

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    // history.replace('/home');
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
