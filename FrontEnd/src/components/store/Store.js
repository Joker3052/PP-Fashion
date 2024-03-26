import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup, Row, Col, Accordion, Container } from 'react-bootstrap';
import { FetchAll } from '../../Services/StoreService';
import ModalView from './ModalView';
import _, { debounce } from 'lodash';
import './Store.scss';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

function Store() {
  const { addToCart } = useCart();
  const [listStore, setListStore] = useState([]);
  const [originalListStore, setOriginalListStore] = useState([]); // Thêm biến tạm thời
  const [IsShowModalView, SetIsShowModalView] = useState(false);
  const [dataStoreView, setDataStoreView] = useState({});
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleViewStore = (Store1) => {
    // console.log(Store1)
    setDataStoreView(Store1)
    SetIsShowModalView(true)

  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedStore = _.orderBy(listStore, [sortField], [sortBy]);
    // setTypeFilter("all");
    setListStore(sortedStore);
    // console.log(sortedStore);
  }

  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchImgName = originalListStore.filter((item) =>
        item.image_name.includes(term)
      );
      setListStore(searchImgName);
    } else {
      setSortBy("asc");
      setTypeFilter("all");
      setListStore(originalListStore); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  const handletypeFilter = (event) => {
    setTypeFilter(event.target.value);
    let term = event.target.value.toLowerCase();
    let searchResult = originalListStore.filter((item) => {
      const typeMatch = event.target.value === "all" || item.type_name === term;
      return typeMatch;
    });
    setSortBy("asc");
    setListStore(searchResult);
  };

  useEffect(() => {
    getStore();
  }, []);

  const getStore = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListStore(res.data);
        setOriginalListStore(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handleClose = () => {
    SetIsShowModalView(false);
    setTypeFilter("all");
    getStore();
  }
  const handleAddToCart = (item) => {
    console.log(item)
    addToCart(item);
    toast.success('Added to cart successfully'); // Hiển thị toast thông báo
  };

  const itemsPerRow = 4; // Số ảnh trên mỗi dòng
  const rows = [];
  for (let i = 0; i < listStore.length; i += itemsPerRow) {
    const rowItems = listStore.slice(i, i + itemsPerRow);
    const row = (
      <Row key={i}>
        {rowItems.map((item) => (
          <Col key={item.id} md={3}>
            <Card style={{ width: '100%' }}>
              <div className="image-container"
                onClick={() => handleViewStore(item)}
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
                <div className='btn_action d-flex justify-content-end'>
                  <button className='btn btn-success mx-3 add-to-cart-button'
                    onClick={() => handleAddToCart(item)}
                  >
                  <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
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
          dataStoreView={dataStoreView}
          handleClose={handleClose}
        />
      </Container>
    </>
  );
}

export default Store;
