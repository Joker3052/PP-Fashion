import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {DeleteDelete} from '../../Services/FeedbackService'

function ModalDelete(props) {
  const { show, handleClose,dataFeedbackDelete } = props;
  const [e_mail, set_e_mail] = useState("");
  const [p_phone, set_p_hone] = useState("");
  const [name, setName] = useState("");
  const [m_ess, set_m_ess] = useState("");

  const handleDeleteUser = async () => {
try {
      let res = await DeleteDelete(dataFeedbackDelete.id)
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
      set_e_mail(dataFeedbackDelete.email_fb)
      setName(dataFeedbackDelete.user_fb)
      set_p_hone(dataFeedbackDelete.phone_fb);
      set_m_ess(dataFeedbackDelete.mess_fb);
    }
  }, [dataFeedbackDelete])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete User : {name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <h2 className="text-danger">Warning this action cannot be undone!</h2>
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
