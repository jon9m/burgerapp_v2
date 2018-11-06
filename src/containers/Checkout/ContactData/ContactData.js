import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderhandler = (event) => {
        event.preventDefault();
        // this.props.ingredients;
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'jon',
                address: {
                    street: 'main'
                }
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json', order).then(response => {
            this.setState({ loading: false, purchasing: false });
            this.props.history.push('/');
        }).catch(err => {
            this.setState({ loading: false, purchasing: false });
            console.log(err);
        });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name="name" placeholder="Your name" />
                <input className={classes.Input} type='email' name="email" placeholder="Your email" />
                <input className={classes.Input} type='text' name="street" placeholder="Street" />
                <input className={classes.Input} type='text' name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderhandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;