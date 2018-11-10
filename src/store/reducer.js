import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const initialState = {
    ingredients: {
        salad: 0, //TEMP load from DB
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    totalPrice: 4
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, //deep copy
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1  //ES 6
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, //deep copy
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1  //ES 6 - dynamic names
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        }
        default:
            return state;
    }
};

export default reducer;