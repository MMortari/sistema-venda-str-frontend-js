import React, { Component, Fragment } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Services
import api from '../../../services/api';
// Components
import Head from '../../../components/Head';
import DinheiroMask from '../../../components/DinheiroMask';
import Loading from '../../../components/Loading';
// Style
import './style.scss';

const MySwal = withReactContent(Swal);

class Vendas extends Component {
  
  state = {
    loading: true,
    vendas: [],
    produtos: [],
    modalShow: false,
    vendaInfo: {}
  }

  async componentDidMount() {
    // Recebe as vendas pela API
    const responseVendas = await api.get('/vendas');
    const vendas = responseVendas.data;
    
    // Recebe os produtos pela API
    const responseProdutos = await api.get('/produtos');
    const produtos = responseProdutos.data;

    // Salva no state
    this.setState({ vendas, produtos, loading: false });

    console.log("Vendas -> ", vendas);
  }

  handleDeleteVenda = id => {
    MySwal.fire({
      title: <p>Deseja apagar essa venda?</p>,
      type: 'question',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Apagar"
    }).then(async ({ value }) => {
      if(value) {
        let apagar = toast("Apagando...", { containerId: 'A', autoClose: false })
        
        // const response = await api.delete(`/vendas/${id}`);
        // setTimeout(() => console.log("set"), 5000);
        const response = await new Promise((resolve) => setTimeout(() => resolve(true), 1500));

        console.log(`Delete ${id} -> `, response);
        if(response) {
          toast.update(apagar, {
            render: 'Apagado com sucesso!',
            type: toast.TYPE.SUCCESS,
            containerId: 'A', 
            autoClose: 10000
          })
        } else {
          toast.update(apagar, {
            render: 'Erro ao apagar!',
            type: toast.TYPE.DANGER,
            containerId: 'A', 
            autoClose: 10000
          })
        }
      };
    })
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

  infoProdutosPeloId = id => {
    const index = _.findIndex(this.state.produtos, ["id", id]);

    return this.state.produtos[index];
  }

  render() {
    return (
      <Fragment>
        <Head title="Vendas" breadcrumb={['Vendas']}>
          <Link className="btn btn-dark" to="/vendas/nova"><i className="fa fa-plus-circle"></i></Link>
        </Head>

        { this.state.loading && (<Loading />) }
        <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />

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
                <td className="text-center"><b>{vendas.produtos.reduce((count, data) => count += data.qtde, 0)}</b></td>
                <td><button className="btn btn-info" onClick={() => {this.handleInfoVenda(vendas)}}><i className="fa fa-info-circle"></i></button></td>
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
                  <td className="text-center">{this.state.vendaInfo.id}</td>
                </tr>
                <tr>
                  <td><b>Total</b></td>
                  <td className="text-center"><DinheiroMask>{this.state.vendaInfo.total}</DinheiroMask></td>
                </tr>
                <tr>
                  <td><b>Produtos</b></td>
                  <td>
                    <Row>
                      <Col className="text-center font-weight-bold" md={6} sm={6}>Qtde</Col>
                      <Col className="font-weight-bold" md={6} sm={6}>Nome</Col>
                      {this.state.vendaInfo.produtos && this.state.vendaInfo.produtos.map((data, index) => (
                        <Fragment key={index}>
                          <Col className="text-center" md={6} sm={6}>{data.qtde}</Col>
                          <Col md={6} sm={6}>{ _.find(this.state.produtos, ["id", data.id]) && _.find(this.state.produtos, ["id", data.id]).nome }</Col>
                          {/* Pequena gambirra, olhar em https://www.freecodecamp.org/forum/t/react-cant-access-a-property-of-an-object-stored-in-state/138169/2 */}
                          
                        </Fragment>
                      ))}
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td><b>Data</b></td>
                  <td className="text-center">{this.state.vendaInfo.created_at}</td>
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