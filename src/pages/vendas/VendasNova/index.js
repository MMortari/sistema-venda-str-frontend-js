import React, { Component, Fragment } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Form as Unform, Select, Input } from '@rocketseat/unform';
import _ from 'lodash';

// Service
import api from '../../../services/api';
// Components
import Head from '../../../components/Head';
import DinheiroMask from '../../../components/DinheiroMask';
import Loading from '../../../components/Loading';
// Style
import './style.scss';

const valores = [{
    id: "0",
    title: "0"
  },
  {
    id: "1",
    title: "1"
  },
  {
    id: "2",
    title: "2"
  },
  {
    id: "3",
    title: "3"
  },
  {
    id: "4",
    title: "4"
  },
  {
    id: "5",
    title: "5"
  },
  {
    id: "6",
    title: "6"
  },
  {
    id: "7",
    title: "7"
  },
  {
    id: "8",
    title: "8"
  },
  {
    id: "9",
    title: "9"
  },
  {
    id: "10",
    title: "10"
  },
  {
    id: "11",
    title: "11"
  },
  {
    id: "12",
    title: "12"
  },
  {
    id: "13",
    title: "13"
  },
  {
    id: "14",
    title: "14"
  },
  {
    id: "15",
    title: "15"
  },
  {
    id: "16",
    title: "16"
  },
  {
    id: "17",
    title: "17"
  },
  {
    id: "18",
    title: "18"
  },
]

class VendasNova extends Component {

  state = {
    loading: true, // Status de loading
    error: false, // Status de erro
    produtos: [], // Lista de produtos
    comandas: [], // Lista de comandas
    comandaSelect: [], // Comanda selecionada
    newComanda: null, // Nova comanda
    totalProdutos: [{ id: null, qtde: 0, total: 0 }], // Totalizador por produto
    total: { qtde: 0, valor: 0 }, // Todal da compra
  }

  async componentDidMount() {
    // Pega os produtos da API
    const responseProdutos = await api.get(`/produtos`);
    const produtos = responseProdutos.data;

    // Pega as comandas da API
    const responseComandas = await api.get(`/comandas`);
    const comandas = responseComandas.data;

    // Gera total produtos
    let totalProdutos = [];
    produtos.map(data => totalProdutos.push({ id: data.id, qtde: 0, total: 0 }));

    // Gera comanda valores das comandas
    let comandaSelect = [];
    comandas.map(data => comandaSelect.push({ id: data.id, title: data.nome }));

    // Armazena no state 
    this.setState({ produtos, comandas, totalProdutos, comandaSelect, loading: false });

    console.log("Initial State -> ", this.state)
  }

  handleFormSubmit = data => {
    console.log("Enviar formulário -> ", data)
  }

  handleSelectComanda = e => {
    console.log("Select Comanda -> ", e.target.value);
    this.setState({
      comandaSelecionada: e.target.value
    })
  }

  handleAddNewComanda = () => {
    console.log("Create comanda");
  }

  handleTotalPorProduto = (e, id, valor) => {
    let index = _.findIndex(this.state.totalProdutos, ['id', id]);

    let produtos = [...this.state.totalProdutos];
    let total = { qtde: 0, valor: 0, };
    const qtde = parseInt(e.target.value);

    produtos[index].total = qtde * valor;
    produtos[index].qtde = qtde;

    produtos.map(data => {
      total.qtde += data.qtde;
      total.valor += data.total;
    })

    this.setState({ totalProdutos: produtos, total });
  }

  render() {
    return ( 
      <Fragment>
        <Head title = "Nova Venda" breadcrumb = {['Venda', 'Nova Venda']} />

        { this.state.loading && (<Loading />) }

        <Unform onSubmit = { () => this.handleFormSubmit }>
          <Row>
            <Col md={5}>
              <Form.Group controlId = "formBasicEmail" >
                <Form.Label>Comanda</Form.Label> 
                <Select className = "form-control" name = "produtos" options = { this.state.comandaSelect } placeholder = "Selecione uma comanda" onChange = { this.handleSelectComanda }/>
              </Form.Group>
            </Col> 
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nova Comanda</Form.Label>
                <Input
                  className="form-control" 
                  type="text" 
                  name="new-comanda" 
                  placeholder="Insira o nome da nova comanda" 
                  disabled={this.state.comandaSelecionada != null} />
              </Form.Group> 
            </Col> 
            <Col md={1} >
              <button 
                className="btn btn-dark" 
                style = {{ "marginTop": 32 }} 
                disabled = {this.state.comandaSelecionada != null} 
                onClick={this.handleAddNewComanda}><i className="fa fa-plus-circle"></i></button>
            </Col> 
            <Col md={12}>
              <table className="table" >
                <thead>
                  <tr>
                    <td>Produto</td>  
                    <td className = "text-center">Preço</td>
                    <td className = "text-center">Qtde</td> 
                    <td className = "text-center">Total</td> 
                  </tr> 
                </thead> 
                <tbody> 
                  {
                    this.state.produtos.map((data, index) => ( 
                      <tr key={data.id}>
                        <td>{ data.nome}</td> 
                        <td className="text-center"><DinheiroMask>{ data.preco }</DinheiroMask></td>
                        <td className="text-center">< Select className="form-control selectSize" name={`produto-${data.id}`} onChange = {e => this.handleTotalPorProduto(e, data.id, data.preco)} options = {valores}/></td >
                        <td className="text-right"><DinheiroMask>{ this.state.totalProdutos[index].total }</DinheiroMask></td >
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
            <Col md={6} sm={0}></Col> 
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