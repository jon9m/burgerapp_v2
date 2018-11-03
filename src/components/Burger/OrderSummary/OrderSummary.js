import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log("Order summary updated!")
    }

    render() {
        let ingredientSymmary = <Spinner />;

        if (this.props.ingredients) {
            ingredientSymmary = Object.keys(this.props.ingredients).map((key) => {
                return (
                    <li key={key}>
                        <span style={{ textTransform: 'capitalize' }}>{key}
                        </span> : {this.props.ingredients[key]}
                    </li>
                );
            });
        }

        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSymmary}
                </ul>
                <strong><p>Total : {this.props.total}</p></strong>
                <p>Continue to Checkout ...?</p>
                <Button btnType='Danger' clicked={this.props.cancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continued}>CONTINUE</Button>
            </Auxi >
        );
    }
};

export default OrderSummary;