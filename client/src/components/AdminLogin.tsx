import React, { useEffect, useRef, useState } from "react";
import avatar from "../assests/profile.png";
import styles from "../styles/Username.module.css";
import { Link, useNavigate,Navigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../slices/AdminSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from '../axios/AdminAxios';

export type Admin = {
  username?:string;
  email: string;
  password: any;
};


const AdminLogin = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [data, setData] = useState<Admin>({username:'',email:'',password:''});

  //const { loading, error } = useAppSelector((state) => state.user);
  const { currentAdmin,error,loading } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (currentAdmin) {
    console.log('jiei')
    return <Navigate to="/admin/home" />
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      dispatch(signInStart());

                 // Validation checks
                 if (!data.email.trim()) {
                  dispatch(signInFailure('Email is required.'));
                  return;
                } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
                  dispatch(signInFailure('Invalid email address.'));
                  return;
                }
          
                if (!data.password.trim()) {
                  dispatch(signInFailure('Password is required.'));
                  return;
                } else if (data.password.trim().length < 6) {
                  dispatch(signInFailure('Password must be at least 6 characters long.'));
                  return;
                }

      const response = await axios.post("/login", data);
      console.log(response.data);
    
      dispatch(signInSuccess(response.data));
      navigate("/admin/home");
    } catch (error: any) {
      //setLoading(false);
      if (error.response.data.message) {
        dispatch(signInFailure(error.response.data.message));
        //setError(error.response.data.message)
      } else {
        dispatch(signInFailure("something went wrong!"));
      }
      console.log("Error:", error);
    }
  };


  return (
<div className="container mx-auto">
  <div
    className="flex justify-center items-center min-h-screen" 
  >
    <div className={styles.glass}>
      <div className="title flex flex-col items-center">
        <h4 className="text-5xl font-bold">Hello Admin </h4>
        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
          Explore More by connecting with us.
        </span>
      </div>

      <form className="py-1" onSubmit={handleSubmit}>
        <div className="profile flex justify-center py-4">
          <img src={avatar} className={styles.profile_img} alt="avatar" />
        </div>

        <div className="textbox flex flex-col items-center gap-3">
          <input
            className={styles.textbox}
            ref={inputRef}
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Email"
          />
          <input
            className={styles.textbox}
            onChange={handleChange}
            type="text"
            id="password"
            placeholder="Password"
          />
                  {error && (
          <div className="error-message text-red-500 text-center mt-3">
            {error}
          </div>
        )}
          <button className={styles.btn} type="submit" style={{color:'lightblue',border:'1px solid black'}}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>


      </form>
    </div>
  </div>
</div>

  )
}

export default AdminLogin

