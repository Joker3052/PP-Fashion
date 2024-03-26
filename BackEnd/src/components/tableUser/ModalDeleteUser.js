import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { DeleteDeleteUser } from '../../Services/UserService';

function ModalDeleteUser(props) {
  const { show, handleClose,dataUserDelete } = props;
  const [name, setName] = useState("");
  const [e_mail, set_e_mail] = useState("");
  const [pass_word, set_pass_word] = useState("");

  const handleDeleteUser = async () => {
try {
      let res = await DeleteDeleteUser(dataUserDelete.id)
      if (res && res.data) {
        handleClose();
        // setName('');
        // set_e_mail('');
        // set_pass_word('');
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
      set_e_mail(dataUserDelete.email)
      setName(dataUserDelete.username)
      set_pass_word(dataUserDelete.password)
    }
  }, [dataUserDelete])


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
              <input type="email" className="form-control" placeholder="Enter email" readOnly
                value={e_mail}
                onChange={(event) => set_e_mail(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter username" readOnly
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" readOnly
                value={pass_word}
                onChange={(event) => set_pass_word(event.target.value)} />
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

export default ModalDeleteUser;
