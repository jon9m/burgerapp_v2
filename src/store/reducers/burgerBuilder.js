import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
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
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    // ...action.ingredients

                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 4
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }
        default:
            return state;
    }
};

export default reducer;