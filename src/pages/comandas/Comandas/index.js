import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

// Services
// import api from '../../../services/api';
import firestoreService from './../../../services/firestore';
// Components
import Head from './../../../components/Head';
import DinheiroMask from './../../../components/DinheiroMask';
import Loading from './../../../components/Loading';
// Style
import './style.scss';

class Comandas extends Component {

  state = {
    loading: true,
    vendas: [],
    produtos: [],
    comandas: [],
    comandaInfo: {},
    showModalInfo: false
  }

  async componentDidMount() {
    // Pega as comandas da API
    const comandas = await firestoreService.getComandas();

    // Pega as vendas da API
    const vendas = await firestoreService.getVendas();

    // Pega as produtos da API
    const produtos = await firestoreService.getProdutos();

    // Armazena no state
    this.setState({ comandas, vendas, produtos, loading: false });

    console.log("Initial state comandas -> ", this.state);
  }

  handleOpenModalInfoComanda = comanda => this.setState({ comandaInfo: comanda, showModalInfo: true });
  handleCloseModalInfoComanda = () => this.setState({ comandaInfo: {}, showModalInfo: false });

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
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td className="text-center">{data.nome}</td>
                  <td className="text-center">{data.vendasId.length}</td>
                  <td className="text-center"><DinheiroMask>{data.total}</DinheiroMask></td>
                  <td className="text-center"><button className="btn btn-info" onClick={() => this.handleOpenModalInfoComanda(data)}><i className="fa fa-info-circle"></i></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.showModalInfo}
          onHide={() => this.setState({ showModalInfo: false })}
          centered
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Informação da Comanda
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <tbody>
                <tr>
                  <td><b>Nome</b></td>
                  <td className="text-center"><b>Total</b></td>
                </tr>
                <tr>
                  <td>{this.state.comandaInfo.nome}</td>
                  {/* <td className="text-center">{this.state.comandaInfo.total}</td> */}
                  <td className="text-center"><DinheiroMask>{this.state.comandaInfo.total}</DinheiroMask></td>
                </tr>
              </tbody>
            </table>

            {this.state.comandaInfo.vendasId && this.state.comandaInfo.vendasId.map((data, index) => {
              const venda = _.find(this.state.vendas, ["id", data]);
              return (
                <Fragment key={index}>
                  <h4>Vendas</h4>
                  <p>{JSON.stringify(venda)}</p>
                </Fragment>
              )
            })}
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

export default Comandas;