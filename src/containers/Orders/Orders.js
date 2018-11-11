import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount = () => {
        this.props.loadOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orderList.map(order => {
                        return <Order ingredients={order.ingredients} key={order.id} price={order.price} />
                    })}
                </div>
            );
        }
        return (orders);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrders: () => {
            return dispatch(actions.fetchOrders());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        orderList: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));