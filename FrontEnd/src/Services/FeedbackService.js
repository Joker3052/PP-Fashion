import axios from './axios-customize'
const FetchAll =()=>
{
   return  axios.get("/feedback_data/all");
}

const PostCreate =(email_fb,phone_fb,user_fb,mess_fb)=>
{
   return  axios.post("/feedback_data/add",{email_fb,phone_fb,user_fb,mess_fb});
}
const PutUpdate =(id,email_fb,phone_fb,user_fb,mess_fb)=>
{
   return axios.put(`/feedback_data/update/${id}`, { email_fb,phone_fb,user_fb,mess_fb });
}
const DeleteDelete =(id)=>
{
   return axios.delete(`/feedback_data/delete/${id}`, { });
}
const PostLogin =(email,password)=>
{
   return  axios.post("/feedback_data/login",{email,password});
}
export{FetchAll,PostCreate,PutUpdate,DeleteDelete,PostLogin};