import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const Menu = () => (
  <aside>
    <ul>
      <li><Link className="addNew btn btn-dark" to="/vendas/nova" >Nova Venda</Link></li>
      <li><span>Geral</span></li>
      {/* <li><Link className="selected" to="/">Dashboard <i className="fa fa-chevron-right"></i></Link></li> */}
      <li><Link to="/">Dashboard <i className="fa fa-chevron-right"></i></Link></li>
      {/* <li><Link to="/relatorios">Relatórios <i className="fa fa-chevron-right"></i></Link></li> */}
      <li><Link to="/vendas">Vendas <i className="fa fa-chevron-right"></i></Link></li>
      <li><Link to="/produtos">Produtos <i className="fa fa-chevron-right"></i></Link></li>
      <li><Link to="/comandas">Comandas <i className="fa fa-chevron-right"></i></Link></li>
      {/* <li><Link to="/vendedores">Vendedores <i className="fa fa-chevron-right"></i></Link></li> */}
    </ul>
  </aside>
)

export default Menu;