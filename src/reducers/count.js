const countReducerDefaultState = 0;

export default (state=countReducerDefaultState, action) => {
    switch(action.type) {
        case 'INCREMENT_COUNT':
            return state + 1;
        default:
            return state;
    }
}