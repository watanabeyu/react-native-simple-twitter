const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case 'TOKEN_SET':
      return Object.assign({}, newState, { token: action.token, token_secret: action.token_secret });
    case 'USER_SET':
      return Object.assign({}, newState, action.user);
    default:
      return state;
      break;
  }
}

