import React from 'react';
const UserContext = React.createContext({id_ad:'', email: '',password:'',adminname:'', auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({id_ad:'', email: '',password:'',adminname:'', auth: false });

  const loginContext = (id_ad,email,token,password,adminname) => {
    setUser((user) => ({
      id_ad:id_ad,
      email: email,
      password:password,
      adminname:adminname,
      auth: true,
    }));
    localStorage.setItem("id_ad", id_ad);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("adminname", adminname);
    
  };

  const logout = () => {
    localStorage.removeItem("id_ad");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("adminname");
    setUser((user) => ({
      id_ad:'',
      email: '',
      password:'',
      adminname:'',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};



export {UserContext,UserProvider};