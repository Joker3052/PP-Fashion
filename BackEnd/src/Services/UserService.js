import axios from './axios-customize'
const FetchAllUser =()=>
{
   return  axios.get("/user/all");
}

const PostCreateUser =(email,username,password)=>
{
   return  axios.post("/user/register",{email,username,password});
}
const PutUpdateUser =(id,email,username,password)=>
{
   return axios.put(`/user/${id}`, { email, username, password });
}
const DeleteDeleteUser =(id)=>
{
   return axios.delete(`/user/${id}`, { });
}
const PostLoginUser =(email,password)=>
{
   return  axios.post("/user/login",{email,password});
}
export{FetchAllUser,PostCreateUser,PutUpdateUser,DeleteDeleteUser,PostLoginUser};