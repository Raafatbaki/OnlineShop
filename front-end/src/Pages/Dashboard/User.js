import { useEffect, useState } from "react";
import { USERS, baseUrl } from "../../Api/Api.js";
import LogoutAdmin from "../Auth/LogoutAdmin.js";
import axios from "axios";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function User() {
  const [users, setUsers] = useState([]);

  const cookie = Cookie();
  const token = cookie.get("admin-token");
  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}/${USERS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handeldelete() {}
  return (
    <div className="bg-white  w-100 p-2">
      <h1>Users Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">userName</th>
            <th scope="col">email</th>
            <th scope="col">ِAction</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <th scope="row">{item.name}</th>
                <td>{item.email}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Link to={`../userProfile/${item.id}`}>
                      <FontAwesomeIcon
                        fontSize={"19px"}
                        color="blue"
                        icon={faPenToSquare}
                      />
                    </Link>
                    <FontAwesomeIcon
                      onClick={handeldelete}
                      fontSize={"19px"}
                      color="red"
                      icon={faTrash}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
