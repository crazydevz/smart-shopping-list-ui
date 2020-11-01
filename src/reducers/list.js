const listDefaultState = {
    isLoading: false,
    listId: Math.random().toString()
};

export default (state = listDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_LIST_START':
            return {
                ...state,
                isLoading: true
            };
        case 'CREATE_LIST_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isLoading: false
            };
        case 'LOAD_LISTS_SUCCESS':
            return {
                ...state,
                loadedLists: action.payload
            };
        default:
            return state;
    }
};