import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreate } from '../../Services/StoreService';
import { toast } from 'react-toastify';

function ModalAddNew(props) {
  const { show, handleClose } = props;
  const [img_file, set_img_file] = useState(null);
  const [img_hover_file, set_img_hover_file] = useState(null);
  const [price, set_price] = useState('');
  const [name, set_name] = useState('');
  const [typename, set_typename] = useState(''); // Mặc định là trống

  const handleSaveUser = async () => {
    try {
      if (typename !== 'men' && typename !== 'women') {
        toast.error('Typename must be "men" or "women"');
        return;
      }

      const formData = new FormData();
      formData.append('image', img_file);
      formData.append('img_hover', img_hover_file);
      formData.append('price_value', price);
      formData.append('image_name', name);
      formData.append('type_name', typename);

      const res = await PostCreate(formData);

      if (res && res.data) {
        handleClose();
        set_name('');
        set_img_file(null);
        set_img_hover_file(null);
        set_price('');
        set_typename('');
        toast.success('Create success');
      } else {
        toast.error('Error!');
      }
    } catch (error) {
      toast.error('Error!');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={name}
                onChange={(event) => set_name(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => set_img_file(event.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label>Image Hover</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => set_img_hover_file(event.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={price}
                onChange={(event) => set_price(event.target.value)}
              />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;