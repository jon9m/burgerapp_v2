import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredientsArray = [];
    for (let key in props.ingredients) {
        ingredientsArray.push({
            amount: props.ingredients[key],
            name: key
        });
    }

    const ingredientsOutput = ingredientsArray.map(ing => {
        return <span
            style={
                {
                    textTransform: "capitalize",
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ddd',
                    padding: '5px'
                }
            }
            key={ing.name}>{ing.name} : ({ing.amount})
            </span>
    })

    return (
        <div className={classes.Order}>
            Ingredients : {ingredientsOutput}
            Price : {Number.parseFloat(props.price).toFixed(2)}
        </div>
    );
}
export default order;