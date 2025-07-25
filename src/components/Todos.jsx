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

    // Update completed status in database and UI
  // Local complete toggle logic
  const handleCompleteToggle = (id) => {
    // Find the current todo
    const currentTodo = todos.find((todo) => todo.$id === id);
    const newCompleted = !currentTodo.completed;
    // Send update to backend
    setLoader(true);
    database.updateDocument(
      conf.appwritedatabaseid,
      conf.appwritecollectionid,
      id,
      { completed: newCompleted }
    ).then(
      function (response) {
        // Update local state based on backend response
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.$id === id ? { ...todo, completed: response.completed } : todo
          )
        );
      },
      function (error) {
        console.log(error);
        updateError(error.message);
      }
    );
    setLoader(false);
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
                [...todos]
                  .sort((a, b) => {
                    // Incomplete first
                    if ((a.completed || false) === (b.completed || false)) return 0;
                    return a.completed ? 1 : -1;
                  })
                  .map((item) => {
                    return (
                      <div key={item.$id}>
                        <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-green-600"
                              checked={item.completed || false}
                              onChange={() => handleCompleteToggle(item.$id)}
                              title="Mark as complete"
                            />
                            <p className={item.completed ? "line-through text-gray-400" : ""}>{item.todo}</p>
                          </div>
                          <div>
                            <span
                              className="text-red-400 cursor-pointer"
                              onClick={() => deleteTodo(item.$id)}
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f31c1cff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m2 0h-10m1 0v12a2 2 0 002 2h6a2 2 0 002-2V6" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Todos;
