import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ModalView(props) {
  const { show, handleClose, dataStoreView } = props;
  const [img_url, set_img_url] = useState("");
  const [img_hover, set_img_hover] = useState("");
  const [name, set_name] = useState("");
  const [price, set_price] = useState("");
  const [typename, set_typename] = useState("");

  useEffect(() => {
    if (show) {
      set_img_url(dataStoreView.image_url)
      set_img_hover(dataStoreView.img_hover_url)
      set_name(dataStoreView.image_name)
      set_price(dataStoreView.price_value)
      set_typename(dataStoreView.type_name)
    }
  }, [dataStoreView])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Product: {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content">
          <div className="image-container">
            <img src={img_url} alt={name} className="modal-image" />
          </div>
          <div className="info-container">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Type:</strong> {typename}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalView;
