const listDefaultState = {
    isLoading: false,
    deliveryId: Math.random().toString()
};

export default (state = listDefaultState, action) => {
    switch (action.type) {
        case 'LOAD_DELIVERY_SUCCESS':
            return {
                ...state,
                deliveryRequests: action.payload
            };
        default:
            return state;
    }
};