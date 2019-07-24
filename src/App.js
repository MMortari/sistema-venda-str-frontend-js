import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Services 
import { app } from './config/firebase';
// Styles
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/scss/bootstrap.scss';
import './../node_modules/font-awesome/css/font-awesome.css';
import './App.scss';
// Components
import Header from './components/Header';
import Menu from './components/Menu';
// Pages
import DashboardMain from './pages/dashboard/DashboardMain';
import Vendas from './pages/vendas/Vendas';
import VendasNova from './pages/vendas/VendasNova';
import Produtos from './pages/produtos/Produtos';
import Comandas from './pages/comandas/Comandas';
import Login from './pages/login/Login';

class App extends Component {

  state = {
    currentUser: {}
  }

  async componentDidMount() {
    await app.auth().onAuthStateChanged((user) => {
      console.log("User -> ", user)
      if(user != null) {
        this.setState({ currentUser: user });
      } else {
        this.setState({ currentUser: null });
      }
    })

    console.log("Initial State App -> ", this.state)
    console.log("Initial Props App -> ", this.props)
  }
  
  render() {
    return (
      <BrowserRouter>
        {this.state.currentUser != null ? (
          <div className="full">
          <Header />
          <div className="content">
              <Menu />
              <main>
                <div className="container">
                  <Switch>
                    <Route path="/" exact component={DashboardMain} />
                    <Route path="/vendas" exact component={Vendas} />
                    <Route path="/vendas/nova" exact component={VendasNova} />
                    <Route path="/produtos" exact component={Produtos} />
                    <Route path="/comandas" exact component={Comandas} />
                    <Route path="/login" exact component={Login} />
                  </Switch>
                </div>
              </main>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    );
  }

}

export default App;