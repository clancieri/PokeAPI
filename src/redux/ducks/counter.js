const INCREMENT = 'increment';

export const increment = () => ({
  type: INCREMENT
});

const initialState = {
  count: 0,
  name: "",
  id: "0"
};

export default (state = initialState, action) =>{
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1};
    default:
       return state;
  }
}