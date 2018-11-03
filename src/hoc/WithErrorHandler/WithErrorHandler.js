import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxi from '../Auxi';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount = () => {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({
                    error: error.message
                });
            });
        }
        
        componentWillUnmount = () => {
            console.log('Will unmount');
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedhandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Auxi>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedhandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxi >
            );
        }

    };
}
export default WithErrorHandler;