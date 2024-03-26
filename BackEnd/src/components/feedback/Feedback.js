import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { FetchAll } from '../../Services/FeedbackService';
import ModalDelete from './ModalDelete';
import ModalView from './ModalView';
import './Feedback.scss';
import { debounce } from 'lodash';

const Feedback = () => {
  const [listFeedback, setListFeedback] = useState([]);
  const [originalListFeedback, setOriginalListFeedback] = useState([]); // Thêm biến tạm thời
  const [IsShowModalDelete, SetIsShowModalDelete] = useState(false);
  const [dataFeedbackDelete, setDataFeedbackDelete] = useState({});
  const [dataFeedbackView, setDataFeedbackView] = useState({});
  const [IsShowModalView, SetIsShowModalView] = useState(false);
  const handleViewFeedback = (feed1) => {
    setDataFeedbackView(feed1)
    SetIsShowModalView(true)
  }
  const handleDeleteFeedback = (feed1) => {
    setDataFeedbackDelete(feed1)
    SetIsShowModalDelete(true)
  }
  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchEmail = originalListFeedback.filter((item) =>
        item.email_fb.includes(term)
      );
      setListFeedback(searchEmail);
    } else {
      setListFeedback(originalListFeedback); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  const handleClose = () => {
    SetIsShowModalDelete(false);
    SetIsShowModalView(false);
    getFeedback();
  }
  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      let res = await FetchAll();
      if (res && res.data) {
        setListFeedback(res.data);
        setOriginalListFeedback(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <>
      <div className='col-4 my-3'>
        <input className='form-control'
          placeholder='search Customer by email'
          //  value={keyWord}
          onChange={(event) => handleSearch(event)}
        ></input>
      </div>
      {listFeedback &&
        listFeedback.length > 0 &&
        listFeedback.map((item, index) => {
          return (
            <div key={`Feedback-${index}`}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item >
                  <Accordion.Header>{item.email_fb}</Accordion.Header>
                  <Accordion.Body>
                  <div className='mess_feed'>
                  {item.mess_fb}
                  </div>   
                    <div className='btn_action'>
                      <button className='btn btn-warning mx-3'
                        onClick={() => handleViewFeedback(item)}
                      ><i className="fa-solid fa-circle-info"></i>
                      </button>
                      <button className='btn btn-danger'
                        onClick={() => handleDeleteFeedback(item)}
                      ><i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })}
      <ModalDelete
        show={IsShowModalDelete}
        dataFeedbackDelete={dataFeedbackDelete}
        handleClose={handleClose}
      />
      <ModalView
        show={IsShowModalView}
        dataFeedbackView={dataFeedbackView}
        handleClose={handleClose}
      />
    </>
  );

}

export default Feedback;
