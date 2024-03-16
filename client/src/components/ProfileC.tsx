import React, { useEffect, useState } from "react";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import avatar from "../assests/profile.png";
import axios from '../axios/Useraxios';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateUserFailure,updateUserStart,updateUserSuccess,signOut } from "../slices/UserSlice";
//import { /*updateUserSuccess as update*/ } from "../slices/UserListSlice";
type EditUser = {
  username:string;
  email:string;
  password:any
}

const ProfileC = () => {

  const dispatch = useAppDispatch();
  const {currentUser,loading,error} = useAppSelector(state=>state.user);
 const [loading1,setLoading1] = useState<boolean>(false) 
  const [image, setImage] = useState<File | null>(null);
   const [formData1,setFormData1] = useState<{ username: string|undefined; email: string|undefined; password?: string }>({ username:currentUser?.username , email:currentUser?.email  });
   const [updateSuccess,setUpdateSuccess] = useState<boolean>(false)
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setFormData1({
      ...formData1,
      [e.target.id]:e.target.value.trim()
    })
  }

  console.log(formData1)
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
     
      if (!formData1.username?.trim()) {
        dispatch(updateUserFailure('Username is required.'));
        return;
      }

      if (!formData1.email?.trim()) {
        dispatch(updateUserFailure('Email is required.'));
        return;
      } else if (!/\S+@\S+\.\S+/.test(formData1.email?.trim())) {
        dispatch(updateUserFailure('Invalid email address.'));
        return;
      }

      if (formData1.password && formData1.password.trim().length < 6) {
        dispatch(updateUserFailure('Password must be at least 6 characters long.'));
        return;
      }

      dispatch(updateUserStart());
      console.log('form-',formData1)
      const response = await axios.put("/update-user/",formData1);
      console.log('update-'+response.data.username);
      dispatch(updateUserSuccess(response.data));
      setUpdateSuccess(true);
      dispatch(updateUserFailure(''))
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000);
    }
    catch(error:any){
      if (error.response.data.message) {
        dispatch(updateUserFailure(error.response.data.message));
        //setError(error.response.data.message)
      } else {
        dispatch(updateUserFailure("something went wrong!"));
      }
      console.log("Error:", error);
    }

  }
  
  /*useEffect(()=>{
    dispatch(updateUserFailure());
  },[])*/
  const handleImageSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (image) {
      setLoading1(true)
      const formData = new FormData();
      formData.append('image', image);
      console.log('form-', formData);
      try {
        const response = await axios.patch("/profile-image", formData,{
          headers:{
            'content-Type':'multipart/form-data'
          }
        });
        setLoading1(false);
        dispatch(updateUserSuccess(response.data));
  
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    
    } else {
      
      console.log('No image selected');
    }
   
  }

  const handleLogout = async() => {
    try{
       await axios.get('/logout');
      dispatch(signOut());
    }
    catch(error:any){
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-min mt-3">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

         
          <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
    <img
      src={image ? URL.createObjectURL(image) : (currentUser && currentUser.image) ? `http://localhost:5000/profilePic/${currentUser.image}` : avatar}
      className={`${styles.profile_img} ${extend.profile_img}`}
      alt="avatar"
    />
  </label>

  {/* Input for selecting a new profile picture */}
  <input
    type="file"
    id="profile"
    name="image"
    accept="image/*"
    onChange={handleImage}
    style={{ display: 'none' }} // Hide the input visually but keep it accessible
  />

  {/* Button for file submission */}
  <button onClick={handleImageSubmit} className="btn btn-primary btn-sm"> {/* Add btn-sm class for small button */}
    {loading1 ? 'Uploading...' : 'Upload'}
  </button>
</div>
            <form className="py-1" onSubmit={handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text" onChange={handleChange}  defaultValue={currentUser?.username}
                  placeholder="FirstName" id="username"
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text" onChange={handleChange} defaultValue={currentUser?.email}
                  placeholder="Email*" id="email"
                />
              </div>

              <input
                className={`${styles.textbox} ${extend.textbox}`}
                type="text" onChange={handleChange} id="password"
                placeholder="Password"
              />
            <p className="text-red-700 mt-3">{error&&error}</p>
            <p className="text-green-700 ">{updateSuccess && 'User update successfully'}</p>
            
              <button className={styles.btn} style={{color:'lightblue',border:'1px solid black'}} type="submit">
                {loading ? 'Loading...':'Update'}
              </button>
            </div>
            </form>
            <div className="flex justify-between mt-5">
              <span className="text-gray-500">
                come back later?{" "}
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </span>
              
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileC;
