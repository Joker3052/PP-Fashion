import axios from './axios-customize'
const FetchAll =()=>
{
   return  axios.get("/total_data/all");
}

const PostCreate =(men_price,women_price,men_product,women_product,label)=>
{
   return  axios.post("/total_data/add",{men_price,women_price,men_product,women_product,label});
}
const PutUpdate =(id,men_price,women_price,men_product,women_product,label)=>
{
   return axios.put(`/total_data/update/${id}`, { men_price,women_price,men_product,women_product,label});
}
const DeleteDelete =(id)=>
{
   return axios.delete(`/total_data/delete/${id}`, { });
}

export{FetchAll,PostCreate,PutUpdate,DeleteDelete};