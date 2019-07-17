import React, { Component, Fragment } from 'react';

// Services
import api from '../../../services/api';
// Components
import Head from './../../../components/Head';
import DinheiroMask from './../../../components/DinheiroMask';
import Loading from './../../../components/Loading';
// Style
import './style.scss';

class Comandas extends Component {

  state = {
    loading: true,
    comandas: []
  }

  async componentDidMount() {
    // Pega as comandas da API
    const responseComandas = await api.get(`/comandas`);
    const comandas = responseComandas.data;

    // Armazena no state
    this.setState({ comandas, loading: false });
  }

  handleInfoComanda = id => {
    console.log("Abrir modal com info da comanda -> ", id);
  }

  render() {
    return (
      <Fragment>
        <Head title="Comandas" breadcrumb={['Comandas']} />

        { this.state.loading && (<Loading />) }

        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Vendas</th>
              <th className="text-center">Total</th>
              <th className="text-center w-5">Info</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.comandas.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td className="text-center">{data.nome}</td>
                  <td className="text-center">{data.vendasId.length}</td>
                  <td className="text-center"><DinheiroMask>{data.total}</DinheiroMask></td>
                  <td className="text-center"><button className="btn btn-info" onClick={() => this.handleInfoComanda(data.id)}><i className="fa fa-info-circle"></i></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default Comandas;