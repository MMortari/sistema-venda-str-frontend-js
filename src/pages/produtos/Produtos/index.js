import React, { Component, Fragment } from 'react';
import { Form, Modal, Button, Row, Col, Alert } from 'react-bootstrap';
import { Form as Unform, Select, Input } from '@rocketseat/unform';

// Service
import api from '../../../services/api';
// Component
import Head from '../../../components/Head';
import DinheiroMask from '../../../components/DinheiroMask'
import Loading from '../../../components/Loading'
//Style
import './style.scss';

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

  handleEditaProduto = (produto) => console.log("Editar Produto -> ", produto)

  handleDeleteProduto = (id) => console.log("Apagar Produto -> ", id)

  handleOpenModalNewProduct = () => this.setState({ showModalNewProduct: true });
  handleCloseModalNewProduct = () => this.setState({ showModalNewProduct: false }); 
  handleSubmitModalNewProduct = async (data) => {
    // console.log("Adicionar novo produtos -> ", data);
    const envia = await api.post(`/produtos`, {
      id: this.state.produtos[this.state.produtos.length] + 1,
      ...data,
      created_at: "06/04/2019T09:16:32"
    })
    console.log("Resposta adicionar novo produtos -> ", envia);
  };

  render() {
    return (
      <Fragment>
        <Head title="Produtos" breadcrumb={['Produtos']} >
          <button className="btn btn-dark" onClick={this.handleOpenModalNewProduct}><i className="fa fa-plus-circle"></i></button>
        </Head>

        { this.state.loading && (<Loading />) }
        { this.state.error && (<Alert variant={"danger"}>error</Alert>) }

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
                <td className="text-center"><button className="btn btn-info" onClick={() => this.handleEditaProduto(produto)}><i className="fa fa-info-circle"></i></button></td>
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
                      <Input className="form-control" type="text" name="nome" placeholder="Insira o nome do produto" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Preço</Form.Label>
                      <Input className="form-control" type="number" name="preco" placeholder="Insira o nome do produto" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Categoria</Form.Label>
                      <Select className="form-control" name="categoriaId" options={this.state.categorias} placeholder="Selecione a categoria do produto" />
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