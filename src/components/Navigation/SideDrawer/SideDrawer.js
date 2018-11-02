import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi';

const sideDrawer = (props) => {
    let attchedClasses = [classes.SideDrawer, classes.Closed];
    if (props.open) {
        attchedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxi>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attchedClasses.join(' ')}>
                <Logo height='10%'></Logo>
                <nav><NavigationItems></NavigationItems></nav>
            </div>
        </Auxi>
    );
};

export default sideDrawer;