const initialState = {
  id: 100,
  loggedIn: false,
  users: [
    {
      id: 1,
      username: 'mngs',
      email: 'sasha@gmail.com',
      password: '12345'
    }
  ],
  currentUser: null,
  invalidEmail: false,
  invalidPassword: false,
  uniqEmail: true,
  uniqUsername: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      const user = state.users.find(user => user.email === action.email);

      if (user && user.password !== action.password) {
        return {
          ...state,
          invalidEmail: false,
          invalidPassword: true
        };
      };

      if (user && user.password === action.password) {
        return {
          ...state,
          loggedIn: true,
          currentUser: user,
          invalidEmail: false,
          invalidPassword: false
        };
      };

      return {
        ...state,
        invalidEmail: true
      };

    case 'USER_LOGGED_OUT':
      return {
        ...state,
        currentUser: null,
        loggedIn: false
      };

    case 'USER_SIGN_UP':
      const newUser = {
        id: state.id + 1,
        username: action.username,
        email: action.email,
        password: action.password
      };

      const usernameIsUniq = !state.users.some(user => user.username === newUser.username);
      const emailIsUniq = !state.users.some(user => user.email === newUser.email);

      if (usernameIsUniq && emailIsUniq) {
        return {
          ...state,
          users: [...state.users, newUser],
          currentUser: newUser,
          loggedIn: true,
          uniqUsername: true,
          uniqEmail: true
        }
      };

      return {
        ...state,
        uniqEmail: emailIsUniq ? true : false,
        uniqUsername: usernameIsUniq ? true : false
      };

    default:
      return state;
  };
};

export default reducer;