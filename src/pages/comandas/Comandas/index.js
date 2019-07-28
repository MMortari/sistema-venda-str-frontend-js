import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Services
// import api from '../../../services/api';
import firestoreService from './../../../services/firestore';
// Components
import Head from './../../../components/Head';
import DinheiroMask from './../../../components/DinheiroMask';
import DataMask from './../../../components/DataMask';
import Loading from './../../../components/Loading';
// Style
import './style.scss';

const MySwal = withReactContent(Swal);

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

    // console.log("Initial state comandas -> ", this.state);
  }

  handleOpenModalInfoComanda = comanda => this.setState({ comandaInfo: comanda, showModalInfo: true });
  handleCloseModalInfoComanda = () => this.setState({ comandaInfo: {}, showModalInfo: false });

  handleDeleteComanda = comanda => {
    console.log("Apagar Comanda -> ", comanda);
    MySwal.fire({
      title: <p>Deseja apagar essa comanda?</p>,
      type: 'question',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Apagar"
    }).then(async ({ value }) => {
      if(value) {
        let apagar = toast("Apagando...", { containerId: 'A', autoClose: false })
        
        const response = await firestoreService.deleteComandas(comanda);

        console.log(`Delete ${comanda.id} -> `, response);
        if(response.status) {
          const comandas = this.state.comandas.filter(data => data.id !== comanda.id);
          this.setState({ comandas });

          toast.update(apagar, {
            render: 'Apagado com sucesso!',
            type: toast.TYPE.SUCCESS,
            containerId: 'A', 
            autoClose: 10000
          })
        } else {
          toast.update(apagar, {
            render: 'Erro ao apagar!',
            type: toast.TYPE.ERROR,
            containerId: 'A', 
            autoClose: 10000
          })
        }
      };
    })
  }

  render() {
    return (
      <Fragment>
        <Head title="Comandas" breadcrumb={['Comandas']} />

        { this.state.loading && (<Loading />) }
        <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />

        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Vendas</th>
              <th className="text-center">Total</th>
              <th className="text-center w-5">Info</th>
              <th className="text-center w-5">Apagar</th>
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
                  <td className="text-center"><button className="btn btn-danger" disabled={data.total !== 0 && data.vendasId.length !== 0} onClick={() => this.handleDeleteComanda(data)}><i className="fa fa-info-circle"></i></button></td>
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
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><b>Total</b></td>
                        <td><DinheiroMask>{venda.total}</DinheiroMask></td>
                      </tr>
                      <tr>
                        <td><b>Produtos</b></td>
                        <td>{venda.produtos.map(data => {
                          const produto = _.find(this.state.produtos, ["id", data.id]);
                          return (
                            <Fragment key={data.id}>
                              {produto.nome} - {data.qtde} Uni<br />
                            </Fragment>
                          )
                        })}</td>
                      </tr>
                      <tr>
                        <td><b>Data</b></td>
                        <td><DataMask>{venda.created_at.seconds * 1000}</DataMask></td>
                      </tr>
                    </tbody>
                  </table>
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