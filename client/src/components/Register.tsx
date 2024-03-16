import React, { useState } from "react";
import axios from "../axios/Useraxios";
import { Link,useNavigate,Navigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { fetchUserListSuccess,/*resetUserList*/ } from "../slices/UserListSlice";

type User = {
  id:number|string
  username: string;
  email: string;
  password: any;
};

/*const Register = () => {

  const { currentUser } = useAppSelector((state) => state.user);

  const [data, setData] = useState<User>({ id: '', username: '', email: '', password: '' });
  const [error,setError] = useState<string | undefined>(undefined);
  //const [valError,setValError] = useState<User>({id:'',username:'',email:'',password:''})
  //const [nameError, setNameError] = useState<string>("");
  //const [emailError, setEmailError] = useState<string>("");
  //const [passwordError, setPasswordError] = useState<any>("");
  const [loading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (currentUser) {
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

      setLoading(true);

      if (!data.username || !data.email || !data.password) {
        setError('All fields are required.');
        setLoading(false);
        return;
      }

      const response = await axios.post("/register", data);
      console.log(response.data);
      
      setLoading(false);
      setError(undefined);
      //dispatch(resetUserList());
      //dispatch(fetchUserListSuccess([response.data]));
      
     
      

      navigate('/login');
    } catch (error:any) {
      setLoading(false);
      if(error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError('something went wrong!');
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form onSubmit={handleSubmit} className="py-1">
            {/* <div className='profile flex justify-center py-4'>
            <label htmlFor="profile">
              <img src="" className={styles.profile_img} alt="avatar" />
            </label>
            
            <input  type="file" id='profile' name='profile' />
  </div>*

           {/* <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                id="username"
                onChange={handleChange}
                placeholder="Username*"
              />
              <input
                className={styles.textbox}
                type="text"
                id="email"
                
                onChange={handleChange}
                placeholder="Email*"
              />
            
              <input
                className={styles.textbox}
                type="text"
                id="password"
                onChange={handleChange}
               
                placeholder="Password*"
              />
              
              <button disabled={loading} className={styles.btn} type="submit">
                {loading ? 'Loading...':'Register'}
              </button>
            </div>
            {error && <div className="error-message text-red-500 text-center mt-3">{error}</div>}

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?
                <Link className="text-red-500" to="/login">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;*/
const Register = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [data, setData] = useState<User>({ id: '', username: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string | undefined>(undefined); // New error state
  const [formError, setFormError] = useState<string | undefined>(undefined); // General form submission error
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    setErrors({ ...errors, [e.target.id]: '' });
    setFieldError(undefined); // Clear field-specific error on change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: { [key: string]: string } = {};

    // Validation checks
    if (!data.username.trim()) {
      validationErrors.username = 'Username is required.';
    }
    if (!data.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = 'Invalid email address.';
    }
    if (!data.password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (data.password.trim().length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/register", data);
      console.log(response.data);
      setLoading(false);
     // setErrors(undefined);
      navigate('/login');
    } catch (error:any) {
      setLoading(false);
      if (error.response.data.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError('Something went wrong!');
      }
      console.log("Error:", error);
    }
  };

  return (
<div className="container mx-auto">
  <div className="flex justify-center items-center min-h-screen"> {/* Changed h-screen to min-h-screen */}
    <div
      className={styles.glass}
      style={{ width: "45%", paddingTop: "3em", minHeight: "25rem" }} 
    >
      <div className="title flex flex-col items-center">
        <h4 className="text-5xl font-bold">Register</h4>
        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
          Happy to join you!
        </span>
      </div>

      <form onSubmit={handleSubmit} className="py-1">
        <div className="textbox flex flex-col items-center gap-6">
          <input
            className={styles.textbox}
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Username*"
          />
          {errors.username && <div className="error-message text-red-500">{errors.username}</div>}
          <input
            className={styles.textbox}
            type="text"
            id="email"
            onChange={handleChange}
            placeholder="Email*"
          />
          {errors.email && <div className="error-message text-red-500">{errors.email}</div>}
          <input
            className={styles.textbox}
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Password*"
          />
          {errors.password && <div className="error-message text-red-500">{errors.password}</div>}
          <button disabled={loading} className={styles.btn} style={{color:'lightblue',border:'1px solid black'}} type="submit">
            {loading ? 'Loading...' : 'Register'}
          </button>
        </div>
        {fieldError && <div className="error-message text-red-500 text-center mt-3">{fieldError}</div>}
        {formError && <div className="error-message text-red-500 text-center mt-3">{formError}</div>} {/* Display general form error */}

        <div className="text-center py-4">
          <span className="text-gray-500">
            Already Register?
            <Link className="text-red-500" to="/login">
              Login Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Register;