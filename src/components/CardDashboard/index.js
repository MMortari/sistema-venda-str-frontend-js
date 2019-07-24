import React from 'react';

// Style
import './style.scss';

const CardDashboard = ({ title, describe, children }) => (
  <div className="cardDashboard">
    <div className="card-left">
      <p className="title">{title}</p>
      <span className="describe">{describe}</span>
    </div>
    <div className="card-right">
      { children }
    </div>
  </div>
)

export default CardDashboard;