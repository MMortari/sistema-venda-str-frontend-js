import React, { Component, Fragment } from 'react';
import Chart from 'react-apexcharts';

// Components
import Head from '../../../components/Head';
import CardDashboard from '../../../components/CardDashboard';
import Loading from '../../../components/Loading';
// Style
import './style.scss';

// var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

class DashboardMain extends Component {

  state = {
    loading: false,
    chartVendas: {
      chartOptionsSparkLine: {
        chart: {
          height: 35,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        xaxis: {
          crosshairs: {
            width: 1
          },
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
      },
      seriesSpark4: [{
        data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
      }],
    }
  }

  componentDidMount() {
    console.log("DashboardMain")
  }

  render() {
    return (
      <Fragment>
        <Head title="Dashboard" breadcrumb={["Dashboard"]} />

        { this.state.loading && (<Loading />) }

        <div className="row">

          <div className="col-4">
            <CardDashboard>
              <Chart 
                options={this.state.chartVendas.chartOptionsSparkLine}
                series={this.state.chartVendas.seriesSpark4}
                type="line"
                width="200"
                height="60"
              />
            </CardDashboard>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="card-header">Vendas</div>
              <div className="card-body">
                <h5 className="card-title">Título de Card Primary</h5>
                <p className="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="card-header">Lucro</div>
              <div className="card-body">
                <h5 className="card-title">Título de Card Primary</h5>
                <p className="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <div className="card-header">Comandas</div>
              <div className="card-body">
                <h5 className="card-title">Título de Card Primary</h5>
                <p className="card-text">Um exemplo de texto rápido para construir o título do card e fazer preencher o conteúdo do card.</p>
              </div>
            </div>
          </div>

        </div>
      </Fragment>
    )
  }

}

export default DashboardMain;