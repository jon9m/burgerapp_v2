import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3,
}

class BurgerBuidler extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).map((val) => {
            return val;
        }).reduce((sum, curr) => {
            return sum + curr;
        }, 0);

        this.setState({
            purchasable: (sum > 0) ? true : false
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount >= 0 ? newCount : 0;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice >= 4 ? newPrice : 4
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchasehandler = () => {
        this.setState({
            purchasing: true
        });
    }

    modalClosed = () => {
        this.setState({
            purchasing: false
        });
    }

    onContinue = () => {
        const queryparams = [];
        for (let i in this.state.ingredients) {
            queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryparams.push('price=' + this.state.totalPrice);
        const queryString = queryparams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    componentDidMount = () => {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            }).catch(err => {
                this.setState({
                    error: true
                });
            });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                cancelled={this.modalClosed}
                continued={this.onContinue}
                total={this.state.totalPrice.toFixed(2)}>
            </OrderSummary>
        );

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = (
            this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        );

        if (this.state.ingredients) {
            burger = (
                <Auxi>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disableInfo={disableInfo}
                        purchasable={this.state.purchasable}
                        total={this.state.totalPrice.toFixed(2)}
                        purchasehandler={this.purchasehandler} />
                </Auxi>
            );
        }

        return (
            <Auxi>
                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                    {orderSummary}
                </Modal>
            </Auxi>
        );
    }
}

export default WithErrorHandler(BurgerBuidler, axios);