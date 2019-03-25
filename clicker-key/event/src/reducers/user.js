const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return state = Object.assign({}, action.text);
    default:
      return state;
  }
};
