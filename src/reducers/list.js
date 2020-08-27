const listDefaultState = {
    isCreating: false,
    listId: Math.random().toString()
};

export default (state = listDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_LIST_START':
            return {
                ...state,
                isCreating: true
            };
        case 'CREATE_LIST_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isCreating: false
            };
        case 'LOADED_LISTS':
            return {
                ...state,
                loadedLists: action.payload
            };
        default:
            return state;
    }
};