import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PutUpdate } from '../../Services/StoreService';
import { toast } from 'react-toastify';

function ModalEdit(props) {
  const { show, handleClose, dataStoreEdit } = props;
  const [img_url, set_img_url] = useState("");
  const [name, set_name] = useState("");
  const [price, set_price] = useState("");
  const [typename, set_typename] = useState("");

  // console.log("check: ", dataStoreEdit)

  const handleEditUser = async () => {
    try {
      let res = await PutUpdate(dataStoreEdit.id, price, name, typename)
      if (res && res.data) {
        handleClose();
        set_price('');
        set_name('');
        set_typename('');
        toast.success("Create success")
        // window.location.reload();
      } else {
        toast.error("Create success")
      }
    } catch (error) {
      toast.error("Error!")
      console.error("Error:", error)
    }
  }
  useEffect(() => {
    if (show) {
      set_img_url(dataStoreEdit.image_url)
      set_name(dataStoreEdit.image_name)
      set_price(dataStoreEdit.price_value)
      set_typename(dataStoreEdit.type_name)

    }
  }, [dataStoreEdit])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content">
            <div className="image-container">
              <img src={img_url} alt={name} className="modal-image" />
            </div>
            <div className="info-container">
              <div className="form-group">
                <label>img name</label>
                <input type="text" className="form-control"
                  value={name}
                  onChange={(event) => set_name(event.target.value)} />
              </div>
              <div className="form-group">
                <label>price</label>
                <input type="text" className="form-control"
                  value={price}
                  onChange={(event) => set_price(event.target.value)} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  className="form-control"
                  value={typename}
                  onChange={(event) => set_typename(event.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;
