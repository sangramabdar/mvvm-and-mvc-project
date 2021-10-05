import React from "react";

import User from "../user/User";
import AppViewModel from "./App.viewmodel";
import style from "./style.module.css";
function App(props) {
  const { error, users, getUsers, onChangeHandler, addUser, deleteUserById } =
    AppViewModel();

  return (
    <div>
      <div>
        <input onChange={onChangeHandler} type="text" name="name" />
        <input onChange={onChangeHandler} type="text" name="age" />
      </div>
      <button onClick={getUsers}>getUsers</button>
      <button onClick={addUser}>adduser</button>
      <div>{error && error}</div>
      <div>
        {users &&
          users.map((u, i) => {
            return (
              <User
                u={u}
                key={i}
                deleteUser={e => {
                  deleteUserById(u._id);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
