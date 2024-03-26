import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FetchAll } from '../../Services/CustomerService';
import ModalEdit from './ModalEdit';
import ModalView from './ModalView';
import ModalDelete from './ModalDelete';
import ModalAddNew from './ModalAddNew';
import './Customer.scss';
import _, { debounce } from 'lodash';

function Customer() {
  const [listCustomers, setListCustomers] = useState([]);
  const [IsShowModalAddNew, SetIsShowModalAddNew] = useState(false);
  const [IsShowModalEdit, SetIsShowModalEdit] = useState(false);
  const [dataCustomerEdit, setDataCustomerEdit] = useState({});
  const [IsShowModalDelete, SetIsShowModalDelete] = useState(false);
  const [dataCustomerDelete, setDataCustomerDelete] = useState({});
  const [IsShowModalView, SetIsShowModalView] = useState(false);
  const [dataCustomerView, setDataCustomerView] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  //  const [keyWord, setKeyWord] = useState(""); //chỉ dùng khi muốn có button search
  const [originalListCustomers, setOriginalListCustomers] = useState([]); // Thêm biến tạm thời

  const handleEditCustomer = (Customer1) => {
    // console.log(Customer1)
    setDataCustomerEdit(Customer1)
    SetIsShowModalEdit(true)

  }
  const handleDeleteCustomer = (Customer1) => {
    // console.log(Customer1)
    setDataCustomerDelete(Customer1)
    SetIsShowModalDelete(true)

  }
  const handleViewCustomer = (Customer1) => {
    // console.log(Customer1)
    setDataCustomerView(Customer1)
    SetIsShowModalView(true)

  }
  const handleClose = () => {
    SetIsShowModalAddNew(false);
    SetIsShowModalEdit(false);
    SetIsShowModalDelete(false);
    SetIsShowModalView(false);
    getCustomers();
  }
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedCustomers = _.orderBy(listCustomers, [sortField], [sortBy]);
    setListCustomers(sortedCustomers);
    // console.log(sortedCustomers);
  }
  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchEmail = originalListCustomers.filter((item) =>
        item.email_ct.includes(term)
      );
      setListCustomers(searchEmail);
    } else {
      setListCustomers(originalListCustomers); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  // Function để cắt chuỗi và thêm "..."
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  useEffect(() => {
    getCustomers();
     // Đặt một khoảng thời gian để gọi lại getCustomers sau mỗi 5 phút (300000ms)
    const intervalId = setInterval(getCustomers, 300000);

    // Trong useEffect, chúng ta cần trả về một hàm để xử lý khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getCustomers = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListCustomers(res.data);
        setOriginalListCustomers(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // //mặc định theo chièu giảm dần
  // const getCustomers = async () => {
  //   try {
  //     let res = await FetchAll();
  //     if (res && res.data) {
  //       const sortedCustomers = _.orderBy(res.data, ["id"], ["desc"]); // Sắp xếp giảm dần theo trường "id"
  //       setListCustomers(sortedCustomers);
  //       setOriginalListCustomers(sortedCustomers); // Lưu trữ dữ liệu gốc
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };
  // console.log("check sort: ", sortBy, sortField)
  return (
    <>
      <div className='my-3 add-new'>
        <span><b>List Customer:</b></span>
        <button className='btn btn-success'
          onClick={() => SetIsShowModalAddNew(true)}
        >Add new Customer</button>
      </div>
      <div className='col-4 my-3'>
        <input className='form-control'
          placeholder='search Customer by email'
        //  value={keyWord}
          onChange={(event) => handleSearch(event)}
        ></input>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className='sort-header'>
                <span>Ordinal</span>
                <span><i className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "id")}
                ></i>
                  <i className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i></span>
              </div>
            </th>
            <th>
            <div className='sort-header'>
            <span>Email</span>
            <span><i className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "email_ct")}
                ></i>
                  <i className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "email_ct")}
                  ></i></span>
                </div>
            </th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Messenger</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listCustomers &&
            listCustomers.length > 0 &&
            listCustomers.map((item, index) => {
              return (
                <tr key={`Customers-${index}`}>
                  <td>{index+1}</td>
                  <td>{item.email_ct}</td>
                  <td>{item.user_ct}</td>
                  <td>{item.phone_ct}</td>
                  <td>{item.address_ct}</td>
                  <td style={{ cursor:'pointer' }}
                  onClick={() => handleViewCustomer(item)}
                  >{truncateText(item.mess_ct, 20)}</td>
                  <td>
                    <button className='btn btn-warning mx-3'
                      onClick={() => handleEditCustomer(item)}
                    ><i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className='btn btn-danger'
                      onClick={() => handleDeleteCustomer(item)}
                    ><i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ModalAddNew
        show={IsShowModalAddNew}
        handleClose={handleClose}
      />
      <ModalEdit
        show={IsShowModalEdit}
        dataCustomerEdit={dataCustomerEdit}
        handleClose={handleClose}
      />
      <ModalDelete
        show={IsShowModalDelete}
        dataCustomerDelete={dataCustomerDelete}
        handleClose={handleClose}
      />
      <ModalView
      show={IsShowModalView}
      dataCustomerView={dataCustomerView}
      handleClose={handleClose}
    />
    </>
  );
}

export default Customer;
