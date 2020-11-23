const listDefaultState = {
    isLoading: false,
    listId: Math.random().toString()
};

export default (state = listDefaultState, action) => {
    switch (action.type) {
        case 'LOAD_LISTS_SUCCESS':
            return {
                ...state,
                sharedLists: action.payload
            };
        default:
            return state;
    }
};