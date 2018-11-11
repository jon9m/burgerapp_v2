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
import * as actions from '../../store/actions/index';

class BurgerBuidler extends Component {

    state = {
        purchasable: false,
        purchasing: false
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
        this.props.onInitPurchased();
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    componentDidMount = () => {
        this.props.onInitIngredients();
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

        let burger = (
            this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        );

        if (this.props.ings) {
            burger = (
                <Auxi>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredeintRemoved}
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
        ings: state.burgerBuilderReducer.ingredients,
        total: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => {
            return dispatch(
                actions.addInigredient(ingName)
            );
        },
        onIngredientRemoved: (ingName) => {
            return dispatch(
                actions.removeInigredient(ingName)
            );
        },
        onInitIngredients: () => {
            return dispatch(
                actions.initInigredient()
            );
        },
        onInitPurchased: () => {
            return dispatch(
                actions.purchaseInit()
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuidler, axios));
