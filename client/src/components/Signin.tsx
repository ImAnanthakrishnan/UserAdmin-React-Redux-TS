import React, { useEffect, useRef, useState } from "react";
import avatar from "../assests/profile.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import axios from "../axios/Useraxios";
import { signInStart, signInSuccess, signInFailure } from "../slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export type User = {
  username:string;
  email: string;
  password: any;
};

const Signin = () => {

  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<User>({username:'', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  
  useEffect(() => {
    dispatch(signInFailure());
  }, []);
  console.log('curre-',currentUser)
  if (currentUser) {
    console.log('jiei')
    return <Navigate to="/" />;
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
      navigate("/");
    } catch (error: any) {
      if (error.response.data.message) {
        dispatch(signInFailure(error.response.data.message));
      } else {
        dispatch(signInFailure("something went wrong!"));
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="container mx-auto">
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "110vh" }} 
    >
      <div className={styles.glass}>
        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Hello </h4>
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
            <button className={styles.btn} style={{color:'lightblue',border:'1px solid black'}} type="submit">
              {loading ? "Loading..." : "Sign In"}
            </button>
          </div>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Dont Have an account?{" "}
              <Link className="text-red-500"  to="/register">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};
{
  /*<div className="container mx-auto mt-5">
      <div className="flex justify-center item-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-4/2 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input ref={inputRef} value={username} onChange={(e)=>setUsername(e.target.value)} className={styles.textbox} type="text" placeholder="usename" />
              {error && <p style={{color:'red'}}> {error}</p>}
              <button  className={styles.btn} type="submit">Let's Go</button>
            </div>
            <div className="text-center py-5">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
  </div>*/
}

export default Signin;
