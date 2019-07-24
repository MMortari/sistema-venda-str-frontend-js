import React, { Component, Fragment } from 'react';
import Chart from 'react-apexcharts';

// Service
import firestoreService from '../../../services/firestore';
// Components
import Head from '../../../components/Head';
import CardDashboard from '../../../components/CardDashboard';
import DinheiroMask from '../../../components/DinheiroMask';
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
                return 'Banana'
              }
            }
          },
          marker: {
            show: true
          }
        }
      },
      seriesSpark4: [{
        data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
      }],
    },
    vendas: [],
    totalVendas: 0,
    totalComandas: 0,
  }

  async componentDidMount() {
    console.time("getVendas")
    // Get vendas from API
    const vendas = await firestoreService.getVendas();
    console.timeEnd("getVendas");
    // Get comandas from API
    console.time("getComandas");
    const comandas = await firestoreService.getComandas();
    console.timeEnd("getComandas");

    const totalVendas = await vendas.reduce((prev, data) => prev + data.total, 0);
    const totalComandas = await comandas.reduce((prev, data) => prev + data.total, 0);

    this.setState({ vendas, totalVendas, totalComandas });

    console.log("Initial state dashboard -> ", this.state);
  }

  render() {
    return (
      <Fragment>
        <Head title="Dashboard" breadcrumb={["Dashboard"]} />

        { this.state.loading && (<Loading />) }

        <div className="row">

          <div className="col-md-6 col-lg-4">
            <CardDashboard title="Vendas" describe={<DinheiroMask>{this.state.totalVendas}</DinheiroMask>}>
              <Chart 
                options={this.state.chartVendas.chartOptionsSparkLine}
                series={this.state.chartVendas.seriesSpark4}
                type="line"
                width="200"
                height="60"
              />
            </CardDashboard>
          </div>
          <div className="col-md-6 col-lg-4">
            <CardDashboard title="Comandas" describe={<DinheiroMask>{this.state.totalComandas}</DinheiroMask>}>
              <Chart 
                options={this.state.chartVendas.chartOptionsSparkLine}
                series={this.state.chartVendas.seriesSpark4}
                type="line"
                width="200"
                height="60"
              />
            </CardDashboard>
          </div>

        </div>
      </Fragment>
    )
  }

}

export default DashboardMain;