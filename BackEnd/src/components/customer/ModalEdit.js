import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PutUpdate } from '../../Services/CustomerService';
import { toast } from 'react-toastify';

function ModalEdit(props) {
  const { show, handleClose, dataCustomerEdit } = props;
  const [e_mail, set_e_mail] = useState("");
  const [p_phone, set_p_hone] = useState("");
  const [name, setName] = useState("");
  const [m_ess, set_m_ess] = useState("");
  const [a_ddress, set_a_ddress] = useState("");

  // console.log("check: ", dataCustomerEdit)

  const handleEditUser = async () => {
    try {
      let res = await PutUpdate(dataCustomerEdit.id, e_mail, p_phone, name, m_ess, a_ddress)
      if (res && res.data) {
        handleClose();
        setName('');
        set_e_mail('');
        set_p_hone('');
        set_m_ess('');
        set_a_ddress('');
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
      set_e_mail(dataCustomerEdit.email_ct)
      setName(dataCustomerEdit.user_ct)
      set_p_hone(dataCustomerEdit.phone_ct);
      set_m_ess(dataCustomerEdit.mess_ct);
      set_a_ddress(dataCustomerEdit.address_ct);

    }
  }, [dataCustomerEdit])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;
