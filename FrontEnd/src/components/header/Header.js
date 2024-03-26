import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../../assets/images/2P-logos_black.png";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BiCart } from "react-icons/bi";
import { UserContext } from "../../context/UserContext";
import ModalEdit from "./ModalEdit";
import "./Header.scss";
import { useCart } from "../../context/CartContext";

function Header() {
  const { cart } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    toast.success("logout success!");
    navigate("/");
  };
  const [IsShowModalEdit, SetIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const handleEditUser = (user1) => {
    console.log(user1);
    setDataUserEdit(user1);
    SetIsShowModalEdit(true);
  };
  const handleClose = () => {
    SetIsShowModalEdit(false);
  };
  return (
    <>
      <div className="bg-gray-400 header-container">
        <Navbar expand="lg" className="container">
          <Container fluid>
            <img
              src={logoApp}
              width="50px"
              height="50px"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <Navbar.Brand as={Link} to="/">
              <p className="text-[36px] mb-0 mr-[100px]">Fashion</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll " />
            <Navbar.Collapse id="navbarScroll">
              {((user && user.auth) || window.location.pathname === "/") && (
                <>
                  <Nav
                    className="me-auto my-2 my-lg-0 gap-4"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <Nav.Link
                      as={NavLink}
                      to="/"
                      className={`nav-link font-bold ${
                        pathname === "/" ? "active" : ""
                      }`}
                    >
                      <p className="text-[16px] m-0 font-bold a">HOME</p>
                    </Nav.Link>
                    {user && user.auth && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to="/store"
                          className={`nav-link font-bold ${
                            pathname === "/store" ? "active" : ""
                          }`}
                        >
                          <p className="text-[16px] m-0 font-bold a">SHOP</p>
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="/contactUs"
                          className={`nav-link font-bold ${
                            pathname === "/contactUs" ? "active" : ""
                          }`}
                        >
                          <p className="text-[16px] m-0 font-bold a">
                            CONTACT US
                          </p>
                        </Nav.Link>
                        <NavDropdown className="font-bold" title="HISTORY">
                          <NavLink to="/bill" className="dropdown-item">
                            Bill
                          </NavLink>
                          <NavLink to="/feedback" className="dropdown-item">
                            Feedback
                          </NavLink>
                        </NavDropdown>
                      </>
                    )}
                    <Nav.Link
                      as={NavLink}
                      to="/about"
                      className={`nav-link font-bold ${
                        pathname === "/about" ? "active" : ""
                      }`}
                    >
                      <p className="text-[16px] m-0 font-bold a">ABOUT</p>
                    </Nav.Link>
                  </Nav>
                  <Nav>
                    {user && user.email ? (
                      <>
                        <div className="gap-4 d-flex  ">
                          <div className="relative">
                            <Nav.Link as={Link} to="/checkOut">
                              <BiCart className="h-[30px] w-[30px]" />
                            </Nav.Link>
                            <p className="absolute top-[-5px] right-[-10px] text-sm font-bold bg-red-500 rounded-[100%] w-[18px] h-[18px] text-center">
                              <p>{cart.length}</p>
                            </p>
                          </div>
                          <span
                            onClick={() => handleEditUser(user)}
                            className="nav-link wecome_user italic"
                          >
                            Welcome {user.email}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Nav.Link as={Link} to="/login">
                          <BiUserCircle className="h-[30px] w-[30px]" />
                        </Nav.Link>
                      </>
                    )}
                    <NavDropdown className="font-bold" title="Account">
                      {user && user.auth == true ? (
                        <NavDropdown.Item onClick={() => handleLogout()}>
                          Logout
                        </NavDropdown.Item>
                      ) : (
                        <NavLink to="/login" className="dropdown-item">
                          Login
                        </NavLink>
                      )}
                    </NavDropdown>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <ModalEdit
          show={IsShowModalEdit}
          dataUserEdit={dataUserEdit}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}

export default Header;
