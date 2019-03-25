const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return state = action.text;
    default:
      return state;
  }
};
