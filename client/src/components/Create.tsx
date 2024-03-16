import React, { useState } from "react";
import axios from "../axios/AdminAxios";
import { Link,useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchUserListSuccess,/*resetUserList*/ } from "../slices/UserListSlice";

type User = {
    id:number|string
    username: string;
    email: string;
    password: any;
  };
  
  const Create = () => {
    const [data, setData] = useState<User>({ id: '', username: '', email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        // Reset errors
        setErrors({});
  
        // Validation
        const newErrors: { [key: string]: string } = {};
        if (!data.username.trim()) {
          newErrors.username = 'Username is required.';
        }
        if (!data.email.trim()) {
          newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
          newErrors.email = 'Invalid email address.';
        }
        if (!data.password.trim()) {
          newErrors.password = 'Password is required.';
        } else if (data.password.trim().length < 6) {
          newErrors.password = 'Password must be at least 6 characters long.';
        }
  
        if (Object.keys(newErrors).length > 0) {
          // If there are validation errors, set them in the state
          setErrors(newErrors);
          setLoading(false);
          return;
        }
  
        // If no validation errors, proceed with form submission
        const response = await axios.post("/create", data);
        console.log(response.data);
        setLoading(false);
        navigate('/admin/home');
      } catch (error: any) {
        setLoading(false);
        console.log("Error:", error);
      }
    };
  
    return (
      <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
          <h3>Add New User</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" name='username' id='username' onChange={handleChange} className='form-control' />
              {errors.username && <div className="error-message text-black mt-1">{errors.username}</div>}
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" name='email' id='email' onChange={handleChange} className='form-control' />
              {errors.email && <div className="error-message text-black mt-1">{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="text" name='password' id='password' onChange={handleChange} className='form-control' />
              {errors.password && <div className="error-message text-black mt-1">{errors.password}</div>}
            </div>
            <button className="btn btn-info mt-3" type="submit">{loading ? 'Loading...' : 'Register'}</button>
          </form>
        </div>
      </div>
    );
  }

export default Create
