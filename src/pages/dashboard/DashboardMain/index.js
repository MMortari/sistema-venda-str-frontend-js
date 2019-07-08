import React, { Component, Fragment } from 'react';

import './style.scss';

import Head from '../../../components/Head';

class DashboardMain extends Component {

  componentDidMount() {
    console.log("DashboardMain")
  }

  render() {
    return (
      <Fragment>
        <Head title="Dashboard" breadcrumb={["Dashboard"]} />

        <div className="row">

          <div className="col-4">
            <div className="card">
              <div className="card-header">Vendas</div>
              <div className="card-body">
                <h5 className="card-title">Título de Card Primary</h5>
                <p className="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="card-header">Lucro</div>
              <div className="card-body">
                <h5 className="card-title">Título de Card Primary</h5>
                <p className="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="card-header">Comandas</div>
              <div className="card-body">
                <h5 className="card-title">Título de Card Primary</h5>
                <p className="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
              </div>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }

}

export default DashboardMain;