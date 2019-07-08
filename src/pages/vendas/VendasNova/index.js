import React, { Component, Fragment } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Form as Unform, Select } from '@rocketseat/unform'; 
import _ from 'lodash';

// Service
import api from '../../../services/api';
// Components
import Head from '../../../components/Head';
import DinheiroMask from '../../../components/DinheiroMask';
// Style
import './style.scss';

const valores = [
  { id: "0", title: "0" },
  { id: "1", title: "1" },
  { id: "2", title: "2" },
  { id: "3", title: "3" },
  { id: "4", title: "4" },
  { id: "5", title: "5" },
  { id: "6", title: "6" },
  { id: "7", title: "7" },
  { id: "8", title: "8" },
  { id: "9", title: "9" },
  { id: "10", title: "10" },
  { id: "11", title: "11" },
  { id: "12", title: "12" },
  { id: "13", title: "13" },
  { id: "14", title: "14" },
  { id: "15", title: "15" },
  { id: "16", title: "16" },
  { id: "17", title: "17" },
  { id: "18", title: "18" },
]

class VendasNova extends Component {

  state = {
    produtos: [],
    totalProdutos: [{ id: null, qtde: 0, total: 0 }],
    total: { qtde: 0, valor: 0 },
    loading: true,
  }

  async componentDidMount() {
    const response = await api.get(`/produtos`);
    const dados = response.data;
    
    let totalProdutos = [];

    dados.map(data => totalProdutos.push({ id: data.id, qtde: 0, total: 0 }))

    this.setState({ produtos: dados, totalProdutos, loading: false });

    console.log("Initial State -> ", this.state)
  }

  handleFormSubmit = (data) => {
    console.log("Enviar formulário -> ", data)
  }

  handleTotalPorProduto = (e, id, valor) => {

    let index = _.findIndex(this.state.totalProdutos, ['id', id]);
    
    let produtos = [ ...this.state.totalProdutos ];
    let total = { qtde: 0, valor: 0, };
    const qtde = parseInt(e.target.value);
    
    produtos[index].total = qtde * valor;
    produtos[index].qtde = qtde;

    produtos.map(data => {
      total.qtde += data.qtde;
      total.valor += data.total;
    })
    
    this.setState({ totalProdutos: produtos, total });
    
    // console.log("State totalProdutos -> ", this.state.totalProdutos);
    // console.log("totalProdutos -> ", this.state);
    // console.log("-------------------------------------------");
  }

  render() {
    return (
      <Fragment>
        <Head title="Nova Venda" breadcrumb={['Venda', 'Nova Venda']} />

        { this.state.loading && (<i className="fa fa-spinner fa-spin"></i>) }

        <Unform onSubmit={() => this.handleFormSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Vendedor</Form.Label>
                <Select className="form-control" name="produtos" options={this.state.produtos} placeholder="Selecione um vendedor" />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Comanda</Form.Label>
                <Select className="form-control" name="produtos" options={this.state.produtos} placeholder="Selecione um vendedor" />
              </Form.Group>
            </Col>
            <Col md={1}>
              <button className="btn btn-dark" style={{"marginTop": 32}}><i className="fa fa-plus-circle"></i></button>
            </Col>
            <Col md={12}>
              <table className="table">
                <thead>
                  <tr>
                    <td>Produto</td> 
                    <td className="text-center">Preço</td>
                    <td className="text-center">Qtde</td>
                    <td className="text-center">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.produtos.map((data, index) => (
                      <tr key={data.id}>
                        <td>{data.nome}</td>
                        <td className="text-center"><DinheiroMask>{data.preco}</DinheiroMask></td>
                        <td className="text-center"><Select className="form-control selectSize" name={`produto-${data.id}`} onChange={(e) => this.handleTotalPorProduto(e, data.id, data.preco)} options={valores} /></td>
                        <td className="text-right"><DinheiroMask>{ this.state.totalProdutos[index].total }</DinheiroMask></td>
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td className="text-right font-bold">Total</td>
                    <td className="text-center">{this.state.total.qtde}</td>
                    <td className="text-right"><DinheiroMask>{this.state.total.valor}</DinheiroMask></td>
                  </tr>
                </tfoot>
              </table>
            </Col>
            <Col md={6} sm={0}>
            </Col>
            <Col md={6} sm={12}>
              <button className="btn btn-dark w-100" type="submit"><i className="fa fa-plus-circle"></i></button>
            </Col>
          </Row>
        </Unform>

      </Fragment>
    )
  }

}

export default VendasNova;