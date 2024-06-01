import React, { useState, useEffect } from "react";
import { database } from "../appwrite/appwriteConfig";
import { v4 as uuid } from "uuid";
import conf from "../appwrite/conf";
import { Todos, Spinner, Error, Success } from "./index";
/// 6656ff9500213bf20b80

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    msg: "",
    isTrue: false,
  });

  function updateError(message) {
    setError((prev) => ({ ...error, msg: message, isTrue: true }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const reloader = () => window.location.reload();

    const promise = database.createDocument(
      conf.appwritedatabaseid,
      conf.appwritecollectionid,
      uuid(),
      { todo }
    );

    promise.then(
      function (res) {
        console.log(res);
        reloader();
      },

      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>

      <>
        <Todos />
      </>
    </div>
  );
}

export default TodoForm;
