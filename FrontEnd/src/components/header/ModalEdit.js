import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PutUpdate } from '../../Services/UserService';
import { toast } from 'react-toastify';

function ModalEdit(props) {
  const { show, handleClose, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [e_mail, set_e_mail] = useState("");
  const [pass_word, set_pass_word] = useState("");
  const [p_hone, set_p_phone] = useState("");
  const [a_ddress, set_a_ddress] = useState("");
  // console.log("check: ", dataUserEdit)
  const handleInputChange_name = (event) => {
    const newValue = event.target.value;
    setName(newValue);

    // Lưu giá trị vào LocalStorage với khóa "username"
    localStorage.setItem('username', newValue);
  };
  const handleInputChange_password = (event) => {
    const newValue = event.target.value;
    set_pass_word(newValue);

    // Lưu giá trị vào LocalStorage với khóa "username"
    localStorage.setItem('password', newValue);
  };
  const handleInputChange_phone = (event) => {
    const newValue = event.target.value;
    set_p_phone(newValue);

    // Lưu giá trị vào LocalStorage với khóa "username"
    localStorage.setItem('phone', newValue);
  };
  const handleInputChange_address = (event) => {
    const newValue = event.target.value;
    set_a_ddress(newValue);

    // Lưu giá trị vào LocalStorage với khóa "username"
    localStorage.setItem('address', newValue);
  };
  const handleEditUser = async () => {
    try {
      let res = await PutUpdate(dataUserEdit.id_ad,pass_word, name,p_hone,a_ddress)
      if (res && res.data) {
        handleClose();
        set_pass_word('');
        setName('');
        set_p_phone('');
        set_a_ddress('');
        // window.onload();
        window.location.reload();
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
      set_e_mail(dataUserEdit.email)
      setName(dataUserEdit.username)
      set_pass_word(dataUserEdit.password)
      set_p_phone(dataUserEdit.phone)
      set_a_ddress(dataUserEdit.address)
    }
  }, [dataUserEdit])

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
              <input type="email" className="form-control" placeholder="Enter email" readOnly
                value={e_mail} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter username"
                value={name}
                onChange={handleInputChange_name}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password"
                value={pass_word}
                onChange={handleInputChange_password} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="number" className="form-control" placeholder="Enter phone number"
                value={p_hone}
                onChange={handleInputChange_phone}/>
            </div>
            <div className="form-group">
              <label>Adress</label>
              <input type="text" className="form-control" placeholder="Enter address"
                value={a_ddress}
                onChange={handleInputChange_address}/>
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
