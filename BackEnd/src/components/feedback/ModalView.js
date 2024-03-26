import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalView(props) {
  const { show, handleClose,dataFeedbackView } = props;
  const [e_mail, set_e_mail] = useState("");
  const [p_phone, set_p_hone] = useState("");
  const [name, setName] = useState("");
  const [m_ess, set_m_ess] = useState("");

  useEffect(() => {
    if (show) {
      set_e_mail(dataFeedbackView.email_fb)
      setName(dataFeedbackView.user_fb)
      set_p_hone(dataFeedbackView.phone_fb);
      set_m_ess(dataFeedbackView.mess_fb);
    }
  }, [dataFeedbackView])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> User : {e_mail} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email"
            value={e_mail}
            onChange={(event) => set_e_mail(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone number</label>
          <input type="number" className="form-control" placeholder="Enter phone number"
            value={p_phone}
            onChange={(event) => set_p_hone(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter username"
            value={name}
            onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Messenger</label>
          <textarea type="text" className="form-control" placeholder="Enter messenger"
            value={m_ess}
            onChange={(event) => set_m_ess(event.target.value)} />
        </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalView;
