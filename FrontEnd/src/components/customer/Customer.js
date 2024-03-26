import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FetchAll } from "../../Services/CustomerService";
import ModalView from "./ModalView";
import "./Customer.scss";
import _, { debounce } from "lodash";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Customer() {
  const { user } = useContext(UserContext);
  const [listCustomers, setListCustomers] = useState([]);
  const [IsShowModalView, SetIsShowModalView] = useState(false);
  const [dataCustomerView, setDataCustomerView] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  //  const [keyWord, setKeyWord] = useState(""); //chỉ dùng khi muốn có button search
  const [originalListCustomers, setOriginalListCustomers] = useState([]); // Thêm biến tạm thời

  const handleViewCustomer = (Customer1) => {
    // console.log(Customer1)
    setDataCustomerView(Customer1);
    SetIsShowModalView(true);
  };
  const handleClose = () => {
    SetIsShowModalView(false);
    getCustomers();
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedCustomers = _.orderBy(listCustomers, [sortField], [sortBy]);
    setListCustomers(sortedCustomers);
    // console.log(sortedCustomers);
  };
  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchEmail = originalListCustomers.filter((item) =>
        item.mess_ct.includes(term)
      );
      setListCustomers(searchEmail);
    } else {
      setListCustomers(originalListCustomers); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  // Function để cắt chuỗi và thêm "..."
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
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
      <div className="container">
        <h3 className="mt-[40px]">Lịch sử mua hàng</h3>
        <div className="col-4 my-3">
          <input
            className="form-control"
            placeholder="search message"
            //  value={keyWord}
            onChange={(event) => handleSearch(event)}
          ></input>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>Ordinal</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Email</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-up"
                      onClick={() => handleSort("asc", "email_ct")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down"
                      onClick={() => handleSort("desc", "email_ct")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Customer</th>
              <th>Messenger</th>
            </tr>
          </thead>
          <tbody>
          {listCustomers &&
            listCustomers.length > 0 &&
            listCustomers
              .filter(item => item.email_ct === user.email) // Filter the array based on the condition
              .map((item, index) => {
                return (
                  <tr key={`Customers-${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.email_ct}</td>
                    <td>{item.user_ct}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewCustomer(item)}
                    >
                      {truncateText(item.mess_ct, 20)}
                    </td>
                  </tr>
                );
              })}          
          </tbody>
        </Table>
        <ModalView
          show={IsShowModalView}
          dataCustomerView={dataCustomerView}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}

export default Customer;
