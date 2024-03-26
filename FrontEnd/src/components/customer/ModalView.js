import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
function ModalView(props) {
  const { show, handleClose, dataCustomerView } = props;
  const [e_mail, set_e_mail] = useState("");
  const [p_phone, set_p_hone] = useState("");
  const [name, setName] = useState("");
  const [m_ess, set_m_ess] = useState("");
  const [a_ddress, set_a_ddress] = useState("");

  // console.log("check: ", dataCustomerView)
  useEffect(() => {
    if (show) {
      set_e_mail(dataCustomerView.email_ct)
      setName(dataCustomerView.user_ct)
      set_p_hone(dataCustomerView.phone_ct);
      set_m_ess(dataCustomerView.mess_ct);
      set_a_ddress(dataCustomerView.address_ct);

    }
  }, [dataCustomerView])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View User: {e_mail}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <textarea
            style={{ width: '100%', minHeight: '200px' }}
            value={m_ess}
            readOnly
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalView;
