import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount = () => {
        axios.get('/orders.json').then((orderdata) => {

            const fetchedOrdersArray = [];
            for (let key in orderdata.data) {
                fetchedOrdersArray.push({ ...orderdata.data[key], id: key });
            }

            this.setState({
                loading: false,
                orders: fetchedOrdersArray
            });
        }).catch(err => {
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order ingredients={order.ingredients} key={order.id} price={order.price} />
                })}
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);