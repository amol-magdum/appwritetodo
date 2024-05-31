import React, { useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import { TodoForm, Todos, Spinner, Error, Success } from "./index";

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [error, setError] = useState({
    msg: "",
    isTrue: false,
  });

  function updateError(message) {
    setError((prev) => ({ ...error, msg: message, isTrue: true }));
  }

  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (res) {
        setUserDetails(res);
      },
      function (error) {
        console.log("--profile page---", error.message);
      }
    );
  }, []);

  const handleLogout = async (e) => {
    try {
      await account.deleteSessions();
      navigate("/");
    } catch (error) {
      console.log("-- delete all sessions -- ", error.message);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetails.name}</p>
            </div>
            <div>
              <button
                className="bg-red-400 text-white p-1 rounded-md hover:bg-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* TODO FORM */}
          <TodoForm />
          {/* TODOS BOX */}
          <Todos />
        </>
      ) : (
        // <Spinner />
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  );
}

export default Profile;
