import React, { useEffect, useState } from "react";
import axios from '../axios/AdminAxios';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate, useParams } from "react-router-dom";

//import { updateUserSuccess } from "../slices/UserListSlice";

type EditUser = {
  username:string;
  email:string;
  password:any
}

type SingleUser = {
  _id:number |string;
  username:string;
  email:string;
}

const Update = () => {
  const {id} = useParams();
   const [selectedUser,setSelectedUser] = useState<SingleUser | null>(null);
  useEffect(()=>{
    const fetchUser = async() =>{
      const response = await axios.get(`/singleUser/${id}`);
        setSelectedUser(response.data);
    }
    fetchUser();
  },[])

  const dispatch = useAppDispatch();
const {userList} = useAppSelector(state=>state.userList);
  console.log('sue-',userList)
 const navigate = useNavigate()
 
   const [formData1,setFormData1] = useState<EditUser | {}>({});
   const [updateSuccess,setUpdateSuccess] = useState<boolean>(false)

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setFormData1({
      ...formData1,
      [e.target.id]:e.target.value
    })
  }
//userList.find(user=>console.log('idd-',user.id))
console.log(id)
//const selectedUser = userList.find(user=>user.id === id)
  //console.log('select-',selectedUser)
   const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      
      console.log('form-',formData1)
      const response = await axios.put(`/edit-user/${id}`,formData1);
       console.log(response.data)     
      //dispatch(updateUserSuccess(response.data));
      //setUpdateSuccess(true);
      //console.log('update-'+response.data);
      navigate('/admin/home');

    }
    catch(error:any){
      /*if (error.response.data.message) {
      
        //setError(error.response.data.message)
      } else {
        
      }*/
      console.log("Error:", error);
    }

  }
  

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
    <div className='w-50 border bg-secondary text-white p-5'>
     <h3>Addd New User</h3>
     <form onSubmit={handleSubmit}>
         <div>
             <label htmlFor="username">Username:</label>
             <input type="text" name='username' id='username' defaultValue={selectedUser?.username} onChange={handleChange} className='form-control' />
         </div>
         <div>
         <label htmlFor="email">Email:</label>
             <input type="text" name='email' id='email' defaultValue={selectedUser?.email} onChange={handleChange} className='form-control' />
         </div>
         <div>
         <label htmlFor="email">Password:</label>
         <input type="text" name='password' id='password' onChange={handleChange} className='form-control' />
         </div>
         {/*error && <div className="error-message text-red-500 text-center mt-3">{error}</div>*/}
         <button className="btn btn-info mt-3">Update{/*loading ? 'Loading...':'Register'*/}</button>
     </form>
     </div>      
 </div>
  )
}

export default Update
