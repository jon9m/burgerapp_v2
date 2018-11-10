import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuidler extends Component {

    state = {
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

        return (sum > 0) ? true : false;
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
        for (let i in this.props.ings) {
            queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryparams.push('price=' + this.props.total);
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
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.props.ings}
                cancelled={this.modalClosed}
                continued={this.onContinue}
                total={this.props.total.toFixed(2)}>
            </OrderSummary>
        );

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = (
            this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        );

        if (this.props.ings) {
            burger = (
                <Auxi>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disableInfo={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        total={this.props.total.toFixed(2)}
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        total: state.totalPrice
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => {
            return dispatch(
                { type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }
            );
        },
        onIngredientRemoved: (ingName) => {
            return dispatch(
                { type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuidler, axios));
