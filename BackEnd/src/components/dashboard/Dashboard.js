import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import { Container, Row, Col } from 'react-bootstrap';
import { FetchAll } from '../../Services/DashboardService';
function Dashboard() {
  const [data, setData] = useState([]);
  const [listdashboard, setListdashboard] = useState([]);
  const [originalListdashboard, setOriginalListdashboard] = useState([]);

  useEffect(() => {
    getdashboard();
    // Đặt một khoảng thời gian để gọi lại getCustomers sau mỗi  (3000ms)
    const intervalId = setInterval(getdashboard, 3000);

    // Trong useEffect, chúng ta cần trả về một hàm để xử lý khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getdashboard = async () => {
    try {
      const res = await FetchAll();
      const resData = res.data;

      setListdashboard(resData);
      setOriginalListdashboard(resData);
      setData(resData.map(item => ({
        label: item.label,
        men_price: item.men_price,
        women_price: item.women_price,
        total: item.men_price + item.women_price,
        men_product: item.men_product,
        women_product: item.women_product,
        total_product: item.men_product + item.women_product
      })));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const totalmenProduct = data.reduce((acc, item) => acc + item.men_product, 0);
  const totalwomenProduct = data.reduce((acc, item) => acc + item.women_product, 0);
  const totalmenprice = data.reduce((acc, item) => acc + item.men_price, 0);
  const totalwomenprice = data.reduce((acc, item) => acc + item.women_price, 0);

  const chartData_product = {
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['men Product', 'women Product'],
    },
    series: [totalmenProduct, totalwomenProduct],
  };

  const chartData_price = {
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['men price', 'women price'],
    },
    series: [totalmenprice, totalwomenprice],
  };

  return (
    <div className="main">
      <Container>
        <div className="App_value">
          <h1>
            Chart of clothes sold in a year by label{" "}
            <i className="fas fa-user"></i>{" "}
          </h1>
          <Row>
            <Col className="col-8">
              <div className="row">
                <div className="col-12">
                  <Chart
                    options={{
                      chart: {
                        id: "basic-bar",
                      },
                      xaxis: {
                        categories: data.map(item => item.label),
                      },
                    }}
                    series={[
                      {
                        name: "total price",
                        data: data.map(item => item.total),
                      },
                      {
                        name: "total quantity",
                        data: data.map(item => item.total_product),
                      },
                    ]}
                    type="bar"
                    width="100%"
                  />
                </div>
              </div>
            </Col>
            <Col className="col-4">
              <div>
                <div>
                  <ReactApexChart options={chartData_product.options} series={chartData_product.series} type="pie" width="380" />
                </div>
                <div>
                  <ReactApexChart options={chartData_price.options} series={chartData_price.series} type="pie" width="380" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
