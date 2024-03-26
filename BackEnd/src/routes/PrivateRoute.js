// import { Routes, Route, Link } from "react-router-dom";
import {useContext} from "react"
import { UserContext } from '../context/UserContext';
import {Alert} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
const PrivateRoute =(props)=>
{
  const navigate = useNavigate();
  const handleGoLogin =()=>
  {
      navigate("/login");
  }
    const { user } = useContext(UserContext); 
    if(user && !user.auth)
    {
        return(
            <>
            <Alert variant="danger" className="mt-3">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
            you do not have permission to access this page, please login to continue
            </p>
          </Alert>
          <div>
          <button className="btn btn-success" onClick={()=>handleGoLogin()}>Login</button>
          </div>
            </>
        )
    }
    return(
        <>
        {props.children}
        </>
    )
}
export default PrivateRoute;