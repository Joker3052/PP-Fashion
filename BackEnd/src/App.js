import './App.scss';
import Header from './components/header/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import AppRoute from './routes/AppRoute';
import { useContext, useEffect } from "react"
import { UserContext } from './context/UserContext';
// import { Row } from 'react-bootstrap';
function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log(user)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("id_ad"),localStorage.getItem("email"),localStorage.getItem("token") ,localStorage.getItem("password"),
      localStorage.getItem("adminname"))
    }
  }, []);
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container style={{ maxHeight: '100%', overflowY: 'auto' }}>
         <AppRoute/>
        </Container>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
