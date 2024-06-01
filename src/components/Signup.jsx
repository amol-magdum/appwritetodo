import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { v4 as uuid } from "uuid";
import { Spinner, Error, Success,checkEmail,checkPassword } from "./index";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    msg: "",
    isTrue: false,
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function updateError(message) {
    setError((prev) => ({ ...error, msg: message, isTrue: true }));
  }
  ///signup
  const signupUser = async (e) => {
    e.preventDefault();
    if ((user.name).length< 3) {
      updateError("name field must have atleast 3 characters.");
    } else if (!checkEmail(user.email)) {
      updateError("Enter valid email.");
    } else if (!checkPassword(user.password)) {
      updateError("Enter valid password, min 8 letter with at least a symbol, upper and lower case letters and a number");
    } else {
      setLoading(true);
      const promise = account.create(
        uuid(),
        user.email,
        user.password,
        user.name
      );

      promise.then(
        function (res) {
          console.log(res);
          setLoading(false);
          setSuccess(true);
          // navigate("/");
        },
        function (error) {
          console.log("--signup error--", error);
          updateError(error.message);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {success ? (
        <Success user={user}/>
      ) : (
        <>
          <div className="text-center text-2xl font-bold">Sign up</div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {error.isTrue ? <Error message={error.msg} /> : <></>}
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. abc"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      onChange={(e) => {
                        setUser({
                          ...user,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      placeholder="abc@xyz.com"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      placeholder="Abcd@123"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={signupUser}
                  >
                    {loading ? <Spinner /> : "Sign up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Signup;
