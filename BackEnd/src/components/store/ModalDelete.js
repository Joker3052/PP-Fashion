import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {DeleteDelete} from '../../Services/StoreService'

function ModalDelete(props) {
  const { show, handleClose,dataStoreDelete } = props;
  const [img_url, set_img_url] = useState("");
  const [name, set_name] = useState('');

  const handleDeleteUser = async () => {
try {
      let res = await DeleteDelete(dataStoreDelete.id)
      if (res && res.data) {
        handleClose();
        toast.success("Create success")
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
      set_img_url(dataStoreDelete.image_url)
      set_name(dataStoreDelete.image_name);
      
    }
  }, [dataStoreDelete])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete Product : {name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-content">
        <h2 className="text-danger">Warning this action cannot be undone!</h2>
          <div className="image-container">
            <img src={img_url} alt={name} className="modal-image" />
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
