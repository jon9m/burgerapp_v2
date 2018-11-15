import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    isEmail: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    minLength: 7
                }
            }
        }
    };

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        } else {
            isValid = true;
        }
        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formEl => {
            return (<Input
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                key={formEl.id}
                changed={(event) => this.inputChangedhandler(event, formEl.id)}
                invalid={formEl.config.validation.touched && !formEl.config.validation.valid} />
            );
        })

        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;