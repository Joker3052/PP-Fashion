import axios from './axios-customize'
const FetchAll =()=>
{
   return  axios.get("/user/all");
}
const PostRegister =(email,password,username,phone,address)=>
{
   return  axios.post("/user/register",{email,password,username,phone,address});
}
const PutUpdate =(id,password,username,phone,address)=>
{
   return axios.put(`/user/${id}`, { password,username,phone,address});
}
const DeleteDelete =(id)=>
{
   return axios.delete(`/user/${id}`, { });
}
const PostLogin =(email,password)=>
{
   return  axios.post("/user/login",{email,password});
}
export{FetchAll,PostRegister,PutUpdate,DeleteDelete,PostLogin};