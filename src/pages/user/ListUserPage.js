import { Link, useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";

import { AuthContext } from "../../contexts/authContext";
import { useEffect, useState, useContext } from "react";
import api from "../../api/api.js";

function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get("/user/all");
      //console.log(response.data);
      setUsers(response.data);
    }
    fetchUsers();
    //console.log("Dentro do useEffect da home!!");
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h1>My Team</h1>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
         
          <span className="sm:ml-3">
            <button
              type="submit"
              className="btn-blue"
              onClick={() => navigate("/profile")}>
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              My Profile
            </button>
          </span>
          <span className="sm:ml-3">
            <button
              type="submit"
              className="btn-blue"
              onClick={() => navigate("/add-user")}>
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add User
            </button>
          </span>
        </div>
      </div>

      <section>
        <form>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg "
              placeholder="Search users by name"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </form>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  return user.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((user) => {
                  if (user._id === loggedInUser.user._id) {
                    return null;
                  }
                  if (user.role === "admin") {
                    return null;
                  }
                  if (user.role === "supervisor") {
                    return null;
                  }
                  if (user.role === "director") {
                    return null;
                  } else
                    return (
                      <tr key={user._id}>
                        <th scope="row">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={user.photo}
                            alt="UserPhoto"
                          />
                          <div className="pl-3 ">
                            <div className="text-base font-semibold">
                              {user.name}
                            </div>
                            <div className="font-normal">{user.email}</div>
                          </div>
                        </th>
                        <td className="py-4 px-6">
                          {/*  {user.jobPosition[0].toUpperCase() + user.jobPosition.slice(1)} */}
                          {user.status}
                        </td>

                        <td className="py-4 px-6">
                          <Link
                            to={`/profile`}
                            state={{ user }}
                            type="button"
                            data-modal-toggle="editUserModal"
                            className="links">
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default ListUserPage;
