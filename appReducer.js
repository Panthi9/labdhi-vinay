const initialState = {
    isAuthenticated: true,
    userDetails: null,
    cardItems: [],
}

function appReducer(state = initialState, action) {
    switch (action.type) {
        case "IS_AUTHENTICATED":
            return { 
                ...state, 
                isAuthenticated: true, 
                userDetails: {
                    id: action.payload.id,
                    firstName: action.payload.first_name,
                    lastName: action.payload.last_name,
                    email: action.payload.email,
                    phonenumber: action.payload.phonenumber ? action.payload.phonenumber : '',
                    address: action.payload.address ? action.payload.address : '',
                } 
            }
        case "NOT_AUTHENTICATED":
            return { ...state, isAuthenticated: false, userDetails: null }
        case "RESET_AUTHENTICATION":
            return { ...state, isAuthenticated: false, userDetails: null }
        case "SET_CARD_ITEM":
            if (state.cardItems.findIndex((item) => item.id == action.payload.id) == -1) {
                return { ...state, cardItems: [...state.cardItems, action.payload] }
            } else {
                return state;
            }
        case "DELETE_CARD_ITEM":
            state.cardItems.splice(action.payload, 1);
            return { ...state, cardItems: [...state.cardItems] }
        case "DELETE_CARD":
            return { ...state, cardItems: []}
        default:
            return state;
    }
}

export default appReducer;