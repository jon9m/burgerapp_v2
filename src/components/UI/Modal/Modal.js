import React, { Component } from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    componentWillUpdate() {
        console.log("Modal updated!")
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <Auxi>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? 1 : 0
                }}>
                    {this.props.children}
                </div>
            </Auxi >
        );
    }
}
export default Modal;