import React, { Component, Fragment } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Form as Unform, Select, Input } from '@rocketseat/unform';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

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
    hasComanda: false, // 
    produtos: [], // Lista de produtos
    comandas: [], // Lista de comandas
    comandaSelect: [], // Comanda selecionada
    newComanda: null, // Nova comanda
    totalProdutos: [{ id: null, qtde: 0, total: 0 }], // Totalizador por produto
    total: { qtde: 0, valor: 0 }, // Todal da compra
    totalComanda: { valor: 0 }, // Todal da comanda
    showModalAdicionarComanda: false
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
    let comandaSelect = [{ id: null, title: "Nenhum" }];
    comandas.map(data => comandaSelect.push({ id: data.id, title: data.nome }));

    // Armazena no state 
    this.setState({ produtos, comandas, totalProdutos, comandaSelect, loading: false });

    console.log("Initial State -> ", this.state)
  }

  handleFormSubmit = async data => {
    const alert = toast("Cadastrando Venda...", { containerId: "A", autoClose: false });

    let produtos = [];

    this.state.produtos.map(produto => {
      if(data[`produto-${produto.id}`] !== "") produtos.push({ qtde: parseInt(data[`produto-${produto.id}`]), id: produto.id })
      return null;
    })
    
    if(!this.state.hasComanda) {
      const response = await api.post(`/vendas`, {
        produtos,
        total: this.state.total.valor,
        created_at: new Date()
      })

      // console.log("Response -> ", response)

      if(response.status === 201) {
        toast.update(alert, {
          render: "Cadastro de venda realizado com sucesso!",
          type: toast.TYPE.SUCCESS,
          containerId: "A",
          autoClose: 5000
        })
      } else {
        toast.update(alert, {
          render: "Erro ao realizar cadastro de venda!",
          type: toast.TYPE.ERROR,
          containerId: "A",
          autoClose: 5000
        })
      }
    } else {}
    
    // console.log("Enviar formulário -> ", JSON.stringify(data));
  }

  handleSelectComanda = e => {
    const { value } = e.target;

    console.log("Select Comanda -> ", value);
    if(value !== null && value !== this.state.comandaSelect[0].title){
      const comanda = _.find(this.state.comandas, ['id', parseInt(value)]);
      
      this.setState({
        totalComanda: { valor: comanda.total + this.state.total.valor },
        comandaSelecionada: value,
        hasComanda: true
      })
    } else {
      this.setState({
        comandaSelecionada: null,
        hasComanda: false
      })
    }
    
  }

  handleCreateNewComanda = async () => {
    const nome = document.getElementById("new-comanda").value;

    const alert = toast("Cadastrando...", { containerId: "A", autoClose: false });
    
    const response = await api.post('/comandas', {
      nome, 
      total: 0,
      vendasId: [],
      created_at: new Date()
    })

    if(response.status === 200 || response.status === 201) {
      toast.update(alert, {
        render: "Cadastrado com sucesso!",
        type: toast.TYPE.SUCCESS,
        containerId: "A",
        autoClose: 2000
      })

      console.log(response);
      this.setState({ comandas: [...this.state.comandas, response.data], comandaSelect: [...this.state.comandaSelect, { id: response.data.id, title: response.data.nome }], showModalAdicionarComanda: false });
    } else {
      toast.update(alert, {
        render: "Erro ao cadastrar!",
        type: toast.TYPE.ERROR,
        containerId: "A",
        autoClose: 2000
      })
    }
  }

  handleTotalPorProduto = (e, id, valor) => {
    let index = _.findIndex(this.state.totalProdutos, ['id', id]);

    let produtos = [...this.state.totalProdutos];
    let total = { qtde: 0, valor: 0, };
    let { totalComanda } = this.state;
    const qtde = parseInt(e.target.value);

    produtos[index].total = qtde * valor;
    produtos[index].qtde = qtde;

    produtos.map(data => {
      total.qtde += data.qtde;
      total.valor += data.total;
      totalComanda.valor += data.total;
      return null;
    })

    this.setState({ totalProdutos: produtos, total, totalComanda });
  }

  render() {
    return ( 
      <Fragment>
        <Head title = "Nova Venda" breadcrumb = {['Venda', 'Nova Venda']} />

        { this.state.loading && (<Loading />) }
        <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />

        <Unform onSubmit={this.handleFormSubmit}>
          <Row>
            <Col md={5}>
              <Form.Group controlId = "formBasicEmail" >
                <Form.Label>Comanda</Form.Label> 
                <Select className="form-control" name="comanda" options={this.state.comandaSelect} placeholder="Selecione uma comanda" onChange={ this.handleSelectComanda }/>
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
                  id="ew-comanda"
                  disabled={this.state.comandaSelecionada != null} />
              </Form.Group> 
            </Col> 
            <Col md={1} >
              <button 
                className="btn btn-dark" 
                style = {{ "marginTop": 32 }} 
                disabled = {this.state.comandaSelecionada != null} 
                onClick={this.handleCreateNewComanda}><i className="fa fa-plus-circle"></i></button>
            </Col> 
            <Col md={12}>
              <table className="table" >
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
                        <td>{ data.nome}</td> 
                        <td className="text-center"><DinheiroMask>{ data.preco }</DinheiroMask></td>
                        <td className="text-center">< Select className="form-control selectSize" name={`produto-${data.id}`} onChange = {e => this.handleTotalPorProduto(e, data.id, data.preco)} options = {valores}/></td >
                        <td className="text-right"><DinheiroMask>{ this.state.totalProdutos[index].total }</DinheiroMask></td >
                      </tr>
                    ))
                  } 
                </tbody> 
                <tfoot>
                  { !this.state.hasComanda ? (
                    <tr>
                      <td></td> 
                      <td className="text-right font-bold">Total</td> 
                      <td className="text-center">{this.state.total.qtde}</td> 
                      <td className="text-right"><DinheiroMask>{this.state.total.valor}</DinheiroMask></td>
                    </tr> 
                  ) : (
                    <>
                      <tr>
                        <td></td> 
                        <td className="text-right font-bold">Total Venda</td> 
                        <td className="text-center">{this.state.total.qtde}</td> 
                        <td className="text-right"><DinheiroMask>{this.state.total.valor}</DinheiroMask></td>
                      </tr> 
                      <tr>
                        <td></td> 
                        <td className="text-right font-bold">Total Comanda</td> 
                        <td className="text-center"></td> 
                        <td className="text-right"><DinheiroMask>{this.state.totalComanda.valor}</DinheiroMask></td>
                      </tr> 
                    </>
                  ) }
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