const userLoggedIn = (email, password) => {
  return {
    type: 'USER_LOGGED_IN',
    email,
    password
  };
};

const userLoggedOut = () => {
  return {
    type: 'USER_LOGGED_OUT'
  };
};

const userSignup = (username, email, password) => {
  return {
    type: 'USER_SIGN_UP',
    username,
    email,
    password
  };
};

export {
  userLoggedIn,
  userLoggedOut,
  userSignup
};