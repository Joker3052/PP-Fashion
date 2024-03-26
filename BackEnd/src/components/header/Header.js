import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../../assets/images/2P-logos_black.png';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useState } from "react"
import { UserContext } from '../../context/UserContext';
import ModalEdit from './ModalEdit';
import './Header.scss'
function Header() {
    const navigate = useNavigate();
    const { logout, user } = useContext(UserContext);

    const handlelogout = () => {
        logout();
        toast.success("logout success!")
        navigate("/");
    }
    const [IsShowModalEdit, SetIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const handleEditUser = (user1) => {
    console.log(user1)
    setDataUserEdit(user1)
    SetIsShowModalEdit(true)

  }
  const handleClose = () => {
    SetIsShowModalEdit(false);
  }
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <img
                    src={logoApp}
                    width="50px"
                    height="50px"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                <Navbar.Brand as={Link} to="/">
                    <span >Admin</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === "/") &&
                        <>
                            <Nav className="me-auto" >
                                <NavLink to="/" className="nav-link">Dashboard</NavLink>
                                {(user && user.auth)&&
                                <>
                                <NavLink to="/customer" className="nav-link">Customer</NavLink>
                                <NavLink to="/store" className="nav-link">Store</NavLink>
                                <NavLink to="/feedback" className="nav-link">Feedback</NavLink>
                                <NavLink to="/tableUser" className="nav-link">TableUser</NavLink>
                                </>}
                            </Nav>
                            <Nav>
                            {user && user.email ? (
                                <span 
                                onClick={() => handleEditUser(user)}
                                className='nav-link wecome_admin'>Welcome {user.adminname}</span>
                              ) : (
                                <span className='nav-link'>Guest</span>
                              )}
                                <NavDropdown title="Account" >
                                    {user && user.auth == true ?
                                        <NavDropdown.Item onClick={() => handlelogout()}>Logout</NavDropdown.Item> :
                                        <NavLink to="/login" className="dropdown-item">login</NavLink>}
                                </NavDropdown>
                            </Nav>
                        </>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <ModalEdit
        show={IsShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
      />
        </>
    );
}

export default Header;