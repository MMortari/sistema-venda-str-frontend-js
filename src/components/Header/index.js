import React from 'react';
import { app } from './../../config/firebase';

import './style.scss';

const Header = () => (
  <header>
    <div>
      <button className="btn btn-light button--open-menu">
        <i className="fa fa-bars"></i>
      </button>
    </div>
    <div>
      <h1>Header</h1>
    </div>
    <div>
      <button className="btn btn-light" onClick={() => app.auth().signOut()}>LogOut</button>
    </div>
  </header>
)

export default Header;