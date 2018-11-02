import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total price <strong>{props.total}</strong></p>
            {controls.map((control) => {
                return <BuildControl
                    key={control.label}
                    label={control.label}
                    ingredientAdded={() => props.ingredientAdded(control.type)}
                    ingredientRemoved={() => props.ingredientRemoved(control.type)}
                    disabled={props.disableInfo[control.type]} />
            })}
            <button onClick={props.purchasehandler} className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;