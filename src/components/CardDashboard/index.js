import React from 'react';

// Style
import './style.scss';

const CardDashboard = ({ children }) => (
  <div className="cardDashboard">
    <div className="card-left">
      <p className="title">Vendas</p>
      <span className="describe">R$ 203,36</span>
    </div>
    <div className="card-right">
      { children }
    </div>
  </div>
)

export default CardDashboard;