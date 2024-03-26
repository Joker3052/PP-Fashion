import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup, Row, Col,Accordion } from 'react-bootstrap';
import { FetchAll } from '../../Services/StoreService';
import ModalEdit from './ModalEdit';
import ModalView from './ModalView';
import ModalDelete from './ModalDelete';
import ModalAddNew from './ModalAddNew';
import _, { debounce } from 'lodash';
import './Store.scss';

function Store() {
  const [listStore, setListStore] = useState([]);
  const [originalListStore, setOriginalListStore] = useState([]); // Thêm biến tạm thời
  const [IsShowModalAddNew, SetIsShowModalAddNew] = useState(false);
  const [IsShowModalEdit, SetIsShowModalEdit] = useState(false);
  const [dataStoreEdit, setDataStoreEdit] = useState({});
  const [IsShowModalDelete, SetIsShowModalDelete] = useState(false);
  const [dataStoreDelete, setDataStoreDelete] = useState({});
  const [IsShowModalView, SetIsShowModalView] = useState(false);
  const [dataStoreView, setDataStoreView] = useState({});
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleEditStore = (Store1) => {
    setDataStoreEdit(Store1)
    SetIsShowModalEdit(true)
  }
  const handleDeleteStore = (Store1) => {
    console.log(Store1)
    setDataStoreDelete(Store1)
    SetIsShowModalDelete(true)
  }
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
    SetIsShowModalAddNew(false);
    SetIsShowModalEdit(false);
    SetIsShowModalDelete(false);
    SetIsShowModalView(false);
    setTypeFilter("all");
    getStore();
  }

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
                  className="normal-image"
                />
                <img
                  src={item.img_hover_url}
                  alt={item.image_name}
                  className="hover-image"
                />
              </div>
              <Card.Body>
                <Card.Title>{item.image_name}</Card.Title>
                <Card.Title><strong>${item.price_value}</strong></Card.Title>
                <div className='btn_action'>
                  <button className='btn btn-warning mx-3'
                    onClick={() => handleEditStore(item)}
                  ><i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className='btn btn-danger'
                    onClick={() => handleDeleteStore(item)}
                  ><i className="fa-solid fa-trash"></i>
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
          placeholder='search Products by name'
        //  value={keyWord}
          onChange={(event) => handleSearch(event)}
        ></input>
      </div>
        <button className='btn btn-success'
          onClick={() => SetIsShowModalAddNew(true)}
        >Add new product</button>
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
      <ModalAddNew
        show={IsShowModalAddNew}
        handleClose={handleClose}
      />
      <ModalEdit
        show={IsShowModalEdit}
        dataStoreEdit={dataStoreEdit}
        handleClose={handleClose}
      />
      <ModalDelete
        show={IsShowModalDelete}
        dataStoreDelete={dataStoreDelete}
        handleClose={handleClose}
      />
      <ModalView
        show={IsShowModalView}
        dataStoreView={dataStoreView}
        handleClose={handleClose}
      />
    </>
  );
}

export default Store;
