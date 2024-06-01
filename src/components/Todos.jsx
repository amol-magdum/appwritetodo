import React, { useState, useEffect } from "react";
import { database } from "../appwrite/appwriteConfig";
import conf from "../appwrite/conf";
import { Spinner, Error, Success } from "./index";

function Todos() {
  const [todos, setTodos] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    msg: "",
    isTrue: false,
  });

  function updateError(message) {
    setError((prev) => ({ ...error, msg: message, isTrue: true }));
  }
  const reloader = () => window.location.reload();

  useEffect(() => {
    setLoader(true);
    const getTodos = database.listDocuments(
      conf.appwritedatabaseid,
      conf.appwritecollectionid
    );

    getTodos.then(
      function (res) {
        setTodos(res.documents);
      },
      function (error) {
        console.log(error);
        updateError(error.message);
      }
    );
    setLoader(false);
  }, []);

  const deleteTodo = (id) => {
    try {
      const promise = database.deleteDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        id
      );
      promise.then(
        function (response) {
          console.log(response);
          reloader();
        },

        function (error) {
          console.log(error);
          updateError(error.message);
        }
      );
      // window.location.reload()
    } catch (error) {
      console.log(error);
      updateError(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {error.isTrue ? (
        <Error message={error.msg} />
      ) : (
        <>
          <p className="text-xl font-bold mb-2">Todo List</p>
          {loader ? (
            <p>Loading ...</p>
          ) : (
            <div>
              {todos &&
                todos.map((item) => (
                  <div key={item.$id}>
                    <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                      <div>
                        <p>{item.todo}</p>
                      </div>
                      <div>
                        <span
                          className="text-red-400 cursor-pointer"
                          onClick={() => deleteTodo(item.$id)}
                        >
                          ❌
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Todos;
