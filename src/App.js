import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuidler from './containers/BurgerBuilder/BurgerBuidler';
import Checkout from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={BurgerBuidler} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
        </Layout>
      </div>
    );
  }
}

export default App;
