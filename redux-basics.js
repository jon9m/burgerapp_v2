const redux = require('redux');
const createStore = redux.createStore;

//Initial state
const initialState = {
    counter: 1
}

//Reducer
const rootReducer = (state = initialState, action) => {
    console.log("state " + JSON.stringify((state)));
    console.log("action " + JSON.stringify(action));

    if (action.type == "ADD") {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;
};

//Store
const store = createStore(rootReducer);
console.log("store.getState() " + JSON.stringify(store.getState()));

//Subscribe to any store events - updates
store.subscribe((data) => {
    console.log("*** store notification ! ", store.getState());
});

//Dispatching an action
console.log("------------------ Dispatching and action ------------------");
store.dispatch({ type: 'ADD', value: 100 });

console.log("------------------ store.getState() after dispatch action ------------------ " + JSON.stringify(store.getState()));

store.dispatch({ type: 'ADD', value: 1 });
