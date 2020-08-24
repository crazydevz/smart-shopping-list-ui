const userDataDefaultState = {
    isAuthenticating: false,
    isAuthenticated: false,
    error: null
};

export default (state=userDataDefaultState, action) => {
    switch(action.type) {
        case 'AUTHENTICATION_START':
            return {
                ...state,
                isAuthenticating: true
            };
        case 'AUTHENTICATION_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isAuthenticating: false,
                isAuthenticated: true
            };
        case 'AUTHENTICATION_FAILURE':
            return {
                ...state,
                error: action.payload,
                isAuthenticating: false
            };
        case 'SIGNOUT':
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
}