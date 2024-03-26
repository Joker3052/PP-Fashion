import axios from './axios-customize'
const FetchAll =()=>
{
   return  axios.get("/customer_data/all");
}

const PostCreate =(email_ct,phone_ct,user_ct,mess_ct,address_ct)=>
{
   return  axios.post("/customer_data/add",{email_ct,phone_ct,user_ct,mess_ct,address_ct});
}
const PutUpdate =(id,email_ct,phone_ct,user_ct,mess_ct,address_ct)=>
{
   return axios.put(`/customer_data/update/${id}`, { email_ct,phone_ct,user_ct,mess_ct,address_ct });
}
const DeleteDelete =(id)=>
{
   return axios.delete(`/customer_data/delete/${id}`, { });
}
const PostLogin =(email,password)=>
{
   return  axios.post("/customer_data/login",{email,password});
}
export{FetchAll,PostCreate,PutUpdate,DeleteDelete,PostLogin};