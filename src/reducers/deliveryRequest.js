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
        case 'LOAD_DELIVERY_IN_PROGRESS':
            return {
                ...state,
                deliveryInProgress: action.payload
            };
        case 'PRE_REQUEST_DELIVERY':
            return {
                ...state,
                deliveryRequestData: action.payload
            };
        default:
            return state;
    }
};