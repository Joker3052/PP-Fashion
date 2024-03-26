import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {DeleteDelete} from '../../Services/CustomerService'

function ModalDelete(props) {
  const { show, handleClose,dataCustomerDelete } = props;
  const [e_mail, set_e_mail] = useState("");
  const [p_phone, set_p_hone] = useState("");
  const [name, setName] = useState("");
  const [m_ess, set_m_ess] = useState("");
  const [a_ddress, set_a_ddress] = useState("");

  const handleDeleteUser = async () => {
try {
      let res = await DeleteDelete(dataCustomerDelete.id)
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
      set_e_mail(dataCustomerDelete.email_ct)
      setName(dataCustomerDelete.user_ct)
      set_p_hone(dataCustomerDelete.phone_ct);
      set_m_ess(dataCustomerDelete.mess_ct);
      set_a_ddress(dataCustomerDelete.address_ct);
    }
  }, [dataCustomerDelete])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete User : {name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <h3 className="text-danger">Warning this action cannot be undone!</h3>
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
        <div className="form-group">
          <label>Address</label>
          <input type="email" className="form-control" placeholder="Enter adress"
            value={a_ddress}
            onChange={(event) => set_a_ddress(event.target.value)} />
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
