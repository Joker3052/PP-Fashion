import axios from './axios-customize'
const FetchAll =()=>
{
   return  axios.get("/image/all");
}

const PostCreate = (formData) => {
   return axios.post("/image/add", formData, {
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   });
 };

const PutUpdate =(id,price_value, image_name, type_name)=>
{
   return axios.put(`/image/update/${id}`, { price_value, image_name, type_name });
}
const DeleteDelete =(id)=>
{
   return axios.delete(`/image/delete/${id}`, { });
}
const PostLogin =(email,password)=>
{
   return  axios.post("/image/login",{email,password});
}
export{FetchAll,PostCreate,PutUpdate,DeleteDelete,PostLogin};