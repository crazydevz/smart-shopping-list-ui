const comparisonsDefaultState = {
    loadedComparisons: []
};

export default (state = comparisonsDefaultState, action) => {
    switch(action.type) {
        case 'GET_COMPARISONS':
            return {
                ...state,
                loadedComparisons: action.payload
            };
        default:
            return state;
    }
}