import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';

import api from '../../../services/api';
import Head from '../../../components/Head';
import DinheiroMask from '../../../components/DinheiroMask';

import './style.scss';

class Vendas extends Component {
  
  state = {
    vendas: [],
    modalShow: false,
    vendaInfo: {
      id: null,
      total: null,
      produtosId: [ null ],
      created_at: null
    }
  }

  async componentDidMount() {
    const response = await api.get('/vendas');
    const vendas = response.data;
    this.setState({ vendas });
    console.log("Vendas -> ", vendas)
  }

  handleDeleteVenda = async (id) => {
    // console.log(`Apagar com id -> ${id}`)
    const response = await api.delete(`/vendas/${id}`);
    console.log("Delete -> ", response)
    // await this.handleImportVendasApi;
  }
  
  handleInfoVenda(venda) {
    // console.log("Venda -> ", venda)
    this.setState({ modalShow: true, vendaInfo: venda });
  }

  handleCloseModal = () => {
    this.setState({
      vendaInfo: {
        id: null,
        total: null,
        produtosId: [ null ],
        created_at: null
      },
      modalShow: false,
    })
  }

  handleImportVendasApi = async () => {
    const response = await api.get('/vendas');
    const vendas = response.data;
    this.setState({ vendas });
  }

  render() {
    return (
      <Fragment>
        <Head title="Vendas" breadcrumb={['Vendas']} />

        <table className="table table-borded">
          <thead>
            <tr>
              <th className="w-10">id</th>
              <th className="text-center">Total</th>
              <th className="text-center">Produtos</th>
              <th className="w-5 text-center">Info</th>
              <th className="w-5 text-center">Apagar</th>
            </tr>
          </thead>
          <tbody>
            { this.state.vendas.map((vendas, index) => (
              <tr key={index}>
                <td>{vendas.id}</td>
                <td className="text-center"><DinheiroMask>{vendas.total}</DinheiroMask></td>
                <td className="text-center"><b>{vendas.produtosId.length}</b></td>
                <td><button className="btn btn-info" onClick={() => this.handleInfoVenda(vendas)}><i className="fa fa-info-circle"></i></button></td>
                <td><button className="btn btn-danger" onClick={() => this.handleDeleteVenda(vendas.id)}><i className="fa fa-trash"></i></button></td>
              </tr>
            )) }
          </tbody>
        </table>

        <Modal show={this.state.modalShow} onHide={this.handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Informações da Venda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <tbody>
                <tr>
                  <td><b>id</b></td>
                  <td>{this.state.vendaInfo.id}</td>
                </tr>
                <tr>
                  <td><b>Total</b></td>
                  <td>{this.state.vendaInfo.total}</td>
                </tr>
                <tr>
                  <td><b>Produtos</b></td>
                  <td>
                    {this.state.vendaInfo.produtosId.map(data => (
                      <>
                      {data}<br/>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td><b>Data</b></td>
                  <td>{this.state.vendaInfo.created_at}</td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }

}

export default Vendas