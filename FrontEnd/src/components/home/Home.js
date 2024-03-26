import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup, Row, Col, Accordion, Container } from 'react-bootstrap';
import { FetchAll } from '../../Services/StoreService';
import ModalView from './ModalView';
import _, { debounce } from 'lodash';
import '../store/Store.scss';
import STYLIST_PICKS from './STYLIST_PICKS';

function Home() {
  const [listHome, setListHome] = useState([]);
  const [originalListHome, setOriginalListHome] = useState([]); // Thêm biến tạm thời
  const [IsShowModalView, SetIsShowModalView] = useState(false);
  const [dataHomeView, setDataHomeView] = useState({});
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleViewHome = (Home1) => {
    // console.log(Home1)
    setDataHomeView(Home1)
    SetIsShowModalView(true)

  }
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedHome = _.orderBy(listHome, [sortField], [sortBy]);
    // setTypeFilter("all");
    setListHome(sortedHome);
    // console.log(sortedHome);
  }

  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchImgName = originalListHome.filter((item) =>
        item.image_name.includes(term)
      );
      setListHome(searchImgName);
    } else {
      setSortBy("asc");
      setTypeFilter("all");
      setListHome(originalListHome); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  const handletypeFilter = (event) => {
    setTypeFilter(event.target.value);
    let term = event.target.value.toLowerCase();
    let searchResult = originalListHome.filter((item) => {
      const typeMatch = event.target.value === "all" || item.type_name === term;
      return typeMatch;
    });
    setSortBy("asc");
    setListHome(searchResult);
  };

  useEffect(() => {
    getHome();
  }, []);

  const getHome = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListHome(res.data);
        setOriginalListHome(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handleClose = () => {
    SetIsShowModalView(false);
    setTypeFilter("all");
    getHome();
  }

  const itemsPerRow = 4; // Số ảnh trên mỗi dòng
  const rows = [];
  for (let i = 0; i < listHome.length; i += itemsPerRow) {
    const rowItems = listHome.slice(i, i + itemsPerRow);
    const row = (
      <Row key={i}>
        {rowItems.map((item) => (
          <Col key={item.id} md={3}>
            <Card style={{ width: '100%' }}>
              <div className="image-container"
                onClick={() => handleViewHome(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.image_name}
                  className="normal-image hover:scale-105 transition-transform"
                />
                <img
                  src={item.img_hover_url}
                  alt={item.image_name}
                  className="hover-image "
                />
              </div>
              <Card.Body>
                <Card.Title>{item.image_name}</Card.Title>
                <Card.Title><strong>${item.price_value}</strong></Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );

    rows.push(row);
  }

  return (
    <>
    <STYLIST_PICKS/>
      <Container>
        <Accordion className='my-3' defaultActiveKey="0">
          <Accordion.Item >
            <Accordion.Header><strong>ACTION</strong></Accordion.Header>
            <Accordion.Body>
              <div className='col-4 my-3'>
                <span>
                  <label>
                    <input
                      type="radio"
                      name="typeFilter"
                      value="all"
                      checked={typeFilter === "all"}
                      onChange={handletypeFilter}
                    />
                    All
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="typeFilter"
                      value="men"
                      checked={typeFilter === "men"}
                      onChange={handletypeFilter}
                    />
                    Men
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="typeFilter"
                      value="women"
                      checked={typeFilter === "women"}
                      onChange={handletypeFilter}
                    />
                    Women
                  </label>
                </span>
              </div>
              <div className='sort-header '>
                <span class="custom-text">
                  <span ><strong>Ca$h</strong></span>
                  <span><i className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "price_value")}
                  ></i>
                    <i className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("desc", "price_value")}
                    ></i></span>
                </span>
                <select
                  value={`${sortBy}-${sortField}`}
                  onChange={(event) => {
                    const selectedOption = event.target.value;
                    const [selectedSortBy, selectedSortField] = selectedOption.split("-");
                    handleSort(selectedSortBy, selectedSortField);
                  }}
                  className="ml-10" 
                >
                  <option value="">Select Time</option>
                  <option value="asc-id">Oldest</option>
                  <option value="desc-id">Newest</option>
                </select>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className='my-3 add-new'>
          <div className='col-4 '>
            <input className='form-control'
              placeholder='search products by name'
              //  value={keyWord}
              onChange={(event) => handleSearch(event)}
            ></input>
          </div>
        </div>

        <div className="main">
          <ListGroup>
            {rows.map((row, index) => (
              <ListGroup.Item key={index}>
                {row}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <ModalView
          show={IsShowModalView}
          dataHomeView={dataHomeView}
          handleClose={handleClose}
        />
      </Container>
    </>
  );
}

export default Home;
