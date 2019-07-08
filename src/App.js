import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

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

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="full">
          <Header />
          <div className="content">
            <Menu />
            <main>
              <div className="container">
                <Route path="/" exact component={DashboardMain} />
                <Route path="/vendas" exact component={Vendas} />
                <Route path="/vendas/nova" exact component={VendasNova} />
                <Route path="/produtos" exact component={Produtos} />
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;