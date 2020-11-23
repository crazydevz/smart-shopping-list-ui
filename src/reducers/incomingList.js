const listDefaultState = {
    isLoading: false,
    listId: Math.random().toString()
};

export default (state = listDefaultState, action) => {
    switch (action.type) {
        case 'LOAD_UA_SUCCESS':
            return {
                ...state,
                unacceptedLists: action.payload
            };
        default:
            return state;
    }
};