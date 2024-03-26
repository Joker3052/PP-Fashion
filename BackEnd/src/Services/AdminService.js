import axios from './axios-customize'
const FetchAll =()=>
{
   return  axios.get("/admin/all");
}
const PostRegister =(email,password,adminname)=>
{
   return  axios.post("/admin/add",{email,password,adminname});
}
const PutUpdate =(id,password,adminname)=>
{
   return axios.put(`/admin/${id}`, { password,adminname });
}
const DeleteDelete =(id)=>
{
   return axios.delete(`/admin/${id}`, { });
}
const PostLogin =(email,password)=>
{
   return  axios.post("/admin/login",{email,password});
}
export{FetchAll,PostRegister,PutUpdate,DeleteDelete,PostLogin};