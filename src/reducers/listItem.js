const listItemDefaultState = {
    isCreating: false,
    itemId: Math.random().toString()
};

export default (state = listItemDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_ITEM_START':
            return {
                ...state,
                isCreating: true
            };
        case 'CREATE_ITEM_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isCreating: false,
            };
        default:
            return state;
    }
};