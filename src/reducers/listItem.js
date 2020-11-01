const listItemDefaultState = {
    isLoading: false,
    itemId: Math.random().toString()
};

export default (state = listItemDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_ITEM_START':
            return {
                ...state,
                isLoading: true
            };
        case 'CREATE_ITEM_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            };
        case 'UPDATE_ITEM_START':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};