import React, { Component } from 'react';
import Auxi from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        show: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            show: false
        });
    }

    drawerToggleClicked = () => {
        this.setState((prevState) => {
            return { show: !prevState.show }
        });
    }

    render() {
        return (
            <Auxi>
                <Toolbar menuclick={this.drawerToggleClicked}></Toolbar>
                <SideDrawer open={this.state.show} closed={this.sideDrawerCloseHandler}></SideDrawer>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxi >
        );
    }
}

export default Layout;