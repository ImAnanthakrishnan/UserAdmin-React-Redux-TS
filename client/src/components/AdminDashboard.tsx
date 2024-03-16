import React, { useEffect, useState } from "react";
import axios from "../axios/AdminAxios";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import {
  fetchUserListSuccess /*fetchUsers, /*removeUserSuccess*/,
} from "../slices/UserListSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
//import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "../slices/AdminSlice";

type User = {
  _id: number | string;
  username: string;
  email: string;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | "">("");
  const [message, setMessage] = useState<string | "">("");

  const [search,setSearch] = useState<string | ''>('')

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async function () {
      const response = await axios.get("/getUser");
      console.log("arr-", response.data.users);
      setUsers(response.data.users);
      dispatch(fetchUserListSuccess(response.data.users)) ;
      //console.log('use1-',users);
    };
    //dispatch(fetchUsers());
    fetchUser();
  }, []);

  const { userList } = useAppSelector((state) => state.userList);
  // console.log('usee-',userList)
  //console.log('find-',userList.find((item)=>item.email === 'ananthuadhigmail.com'))
  // const dispatch = useAppDispatch();

  const { currentAdmin } = useAppSelector((state) => state.admin);
  if (!currentAdmin) {
    return <Navigate to="/admin" />;
  }

  const handleDelete = async (id: number | string) => {
    try {
      console.log(id);
      const response = await axios.delete(`/delete/${id}`);
      if (response.status === 200) {
        setMessage(response.data);
        ///alert(response.data)
        //  dispatch(removeUserSuccess(id));
        console.log("del-", response.data.users);
        // setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

        //
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/signout");
      dispatch(signOut());
      navigate("/admin");
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log("u1-", users);

  return (
    <div className="container">
      <h2>User Details</h2>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Link to="/admin/create" className="btn btn-success mr-2">
            Create +
          </Link>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name or email"
           onChange={(e)=>setSearch(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.email.toLowerCase().includes(search)
          }).map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <NavLink
                  to={`/admin/update/${user._id}`}
                  className="btn btn-primary btn-sm mr-2"
                >
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
