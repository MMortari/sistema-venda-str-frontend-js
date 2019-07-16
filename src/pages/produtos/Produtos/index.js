import React, { Component, Fragment } from 'react';
import { Form, Modal, Button, Row, Col } from 'react-bootstrap';
import { Form as Unform, Select, Input } from '@rocketseat/unform';
import { ToastContainer, toast } from 'react-toastify';
import { find } from 'lodash';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Service
import api from '../../../services/api';
// Component
import Head from '../../../components/Head';
import DinheiroMask from '../../../components/DinheiroMask'
import Loading from '../../../components/Loading'
//Style
import './style.scss';

const MySwal = withReactContent(Swal);

class Produtos extends Component {

  state = {
    loading: true,
    error: false,
    produtos: [],
    categorias: [],
    showModalNewProduct: false,
  }

  async componentDidMount() {
    const responseProdutos = await api.get(`/produtos?_expand=categoria`);
    const produtos = responseProdutos.data;

    const responseCategoria = await api.get('/categorias');
    let categorias = [];
    responseCategoria.data.map((data) => categorias.push({ 
      id: data.id, 
      title: data.nome
    }));

    this.setState({ produtos, categorias, loading: false });

    console.log("Initial Produtos State -> ", this.state)
  }

  // Editar Produtos
  handleEditaProduto = (produto) => console.log("Editar Produto -> ", produto)

  // Apagar Produto
  handleDeleteProduto = id => {
    MySwal.fire({
      title: <p>Deseja apagar essa produto?</p>,
      type: 'question',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Apagar"
    }).then(async ({ value }) => {
      if(value) {
        let alert = toast("Pagando...", { containerId: 'A', autoClose: false });

        const response = await api.delete(`/produtos/${id}`);

        if(response.status === 200) {
          toast.update(alert, {
            render: 'Apagado com sucesso!',
            type: toast.TYPE.SUCCESS,
            containerId: 'A', 
            autoClose: 5000
          })

          const produtos = this.state.produtos.filter(data => data.id !== id);
          this.setState({ produtos })
        } else {
          toast.update(alert, {
            render: 'Erro ao apagar!',
            type: toast.TYPE.ERROR,
            containerId: 'A', 
            autoClose: 5000
          })
        }
      }
    })
  }

  // Adicionar Produtos
  handleOpenModalNewProduct = () => this.setState({ showModalNewProduct: true });
  handleCloseModalNewProduct = () => this.setState({ showModalNewProduct: false }); 
  handleSubmitModalNewProduct = async (data) => {
    console.log("Adicionar novo produtos -> ", data);
    let alert = toast("Adicionando...", { containerId: 'A', autoClose: false });
    const envia = await api.post(`/produtos`, {
      id: this.state.produtos[this.state.produtos.length] + 1,
      ...data,
      categoriaId: parseInt(data.categoriaId),
      preco: parseFloat(data.preco),
      created_at: new Date()
    })

    if(envia.status === 201 || envia.status === 200) {
      toast.update(alert, {
        render: 'Adicionado com sucesso!',
        type: toast.TYPE.SUCCESS,
        containerId: 'A', 
        autoClose: 5000
      })
      this.setState({ produtos: [
        ...this.state.produtos, 
        { ...envia.data, showModalNewProduct: false, categoria: { nome: find(this.state.categorias, ["id", envia.data.categoriaId]).title } }
      ] })
    } else {
      toast.update(alert, {
        render: 'Erro ao adicionar!',
        type: toast.TYPE.ERROR,
        containerId: 'A', 
        autoClose: 5000
      })
    }
  };

  render() {
    return (
      <Fragment>
        <Head title="Produtos" breadcrumb={['Produtos']} >
          <button className="btn btn-dark" onClick={this.handleOpenModalNewProduct}><i className="fa fa-plus-circle"></i></button>
        </Head>

        { this.state.loading && (<Loading />) }
        <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />

        <table className="table table-borded">
          <thead>
            <tr>
              <th className="w-10">id</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Preço</th>
              <th className="text-center">Categoria</th>
              <th className="w-5 text-center">Editar</th>
              <th className="w-5 text-center">Apagar</th>
            </tr>
          </thead>
          <tbody>
            { this.state.produtos.map((produto, index) => (
              <tr key={index}>
                <td>{produto.id}</td>
                <td className="text-center">{produto.nome}</td>
                <td className="text-center"><DinheiroMask>{produto.preco}</DinheiroMask></td>
                <td className="text-center">{produto.categoria.nome}</td>
                <td className="text-center"><button className="btn btn-info" onClick={() => this.handleEditaProduto(produto)}><i className="fa fa-edit"></i></button></td>
                <td><button className="btn btn-danger" onClick={() => this.handleDeleteProduto(produto.id)}><i className="fa fa-trash"></i></button></td>
              </tr>
            )) }
          </tbody>
        </table>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.state.showModalNewProduct}
          onHide={() => this.setState({ showModalNewProduct: false })}
          centered
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Cadastrar Novo Produto
            </Modal.Title>
          </Modal.Header>
          <Unform onSubmit={this.handleSubmitModalNewProduct}>
            <Modal.Body>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Nome</Form.Label>
                      <Input className="form-control" type="text" name="nome" placeholder="Insira o nome do produto" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Preço</Form.Label>
                      <Input className="form-control" type="number" name="preco" placeholder="Insira o nome do produto" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Categoria</Form.Label>
                      <Select className="form-control" name="categoriaId" options={this.state.categorias} placeholder="Selecione a categoria do produto" required />
                    </Form.Group>
                  </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ showModalNewProduct: false })}>Close</Button>
              <button className="btn btn-primary" type="submit">Cadastrar</button>
            </Modal.Footer>
          </Unform>
        </Modal>
      </Fragment>
    )
  }

}

export default Produtos;