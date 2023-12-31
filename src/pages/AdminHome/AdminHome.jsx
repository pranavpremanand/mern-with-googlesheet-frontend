import React, { useEffect } from "react";
import { changeIsBlockedStatus, getUsers } from "../../utils/apiCalls";
import { useStateValue } from "../../StateProvider";
import "./AdminHome.scss";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [{ users }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // get users list
  const getUsersList = async () => {
    dispatch({ type: "SET_LOADING", status: true });
    try {
      const response = await getUsers();
      dispatch({ type: "SET_USERS_LIST", data: response.data.data });
    } catch (err) {
      // handle error
    }finally{
      dispatch({ type: "SET_LOADING", status: false });
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  // block or unblock user
  const changeUserStatus = async (userId, status) => {
    dispatch({ type: "SET_LOADING", status: true });
    try {
      const data = {
        userId,
        status,
      };
      const response = await changeIsBlockedStatus(data);
      if (response.data.success) {
        dispatch({ type: "SET_USER_STATUS", userId, status });
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch({ type: "SET_LOADING", status: false });
    }
  };

  const doLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className="admin-home-container">
      <button className="primary-btn" onClick={doLogout}>
        Logout
      </button>
      {/* <div className="input-box">
        <input type="text" placeholder="Paste googlesheet ID here..." />
        <button className="primary-btn">Update sheet</button>
      </div> */}
      <table className="users-table">
        <caption>Users</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="table-item" key={user._id}>
              <td data-label="Name">{user.email}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Status">
                {user.isBlocked ? (
                  <button
                    className="red-btn"
                    onClick={() => changeUserStatus(user._id, !user.isBlocked)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="green-btn"
                    onClick={() => changeUserStatus(user._id, !user.isBlocked)}
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;
