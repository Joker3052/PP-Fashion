import './App.scss';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
// import Container from 'react-bootstrap/Container';
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
      loginContext(localStorage.getItem("id_ad"), localStorage.getItem("email"), localStorage.getItem("token"), localStorage.getItem("password"),
        localStorage.getItem("username"),localStorage.getItem("phone"),localStorage.getItem("address"))
    }
    let prevScrollPos = document.documentElement.scrollTop;
    const headerContainer = document.querySelector(".header-container");
    const headerHeight = headerContainer.offsetHeight;

    function handleScroll() {
      const currentScrollPos = document.documentElement.scrollTop;

      if (currentScrollPos > prevScrollPos) {
        headerContainer.style.top = `-${headerHeight}px`;
      } else {
        headerContainer.style.top = "0";
      }

      prevScrollPos = currentScrollPos;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className='app-container'>
        <Header />
        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
          <AppRoute />
        </div>
        <Footer />
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
