import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: false,
                    valid: true,
                    touched: false
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: false,
                    valid: true,
                    touched: false
                }
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: false,
                    valid: true,
                    touched: false
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                validation: {
                    required: false,
                    valid: true,
                    touched: false
                }
            }
        },
        loading: false,
        isFormValid: false
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        } else {
            isValid = true;
        }
        return isValid;
    }

    orderhandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElIdentifier in this.state.orderForm) {
            formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
        }

        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('orders.json', order).then(response => {
            this.setState({ loading: false, purchasing: false });
            this.props.history.push('/');
        }).catch(err => {
            this.setState({ loading: false, purchasing: false });
            console.log(err);
        });
    }

    inputChangedhandler = (event, inputIdentifier) => {
        let updatedForm = {
            ...this.state.orderForm
        };
        //Deep clone level 2
        const updatedFormEl = {
            ...updatedForm[inputIdentifier]
        };
        updatedFormEl.validation.touched = true;
        updatedFormEl.value = event.target.value;
        updatedFormEl.validation.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedForm[inputIdentifier] = updatedFormEl;

        let isFormValid = true;
        for (let inputidentifiers in updatedForm) {
            if (updatedForm[inputidentifiers].validation.valid && isFormValid) {
                isFormValid = true;
            } else {
                isFormValid = false;
                break;
            }
        }
        this.setState({
            isFormValid: isFormValid
        });

        console.log("Is Form valid " + this.state.isFormValid);

        this.setState({
            orderForm: updatedForm
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderhandler}>
                {formElementsArray.map(formEl => {
                    return <Input
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        key={formEl.id}
                        changed={(event) => this.inputChangedhandler(event, formEl.id)}
                        invalid={formEl.config.validation.touched && !formEl.config.validation.valid} />
                })}
                <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.orderhandler}>ORDER</Button>
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