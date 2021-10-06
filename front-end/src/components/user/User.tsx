import React, { useState } from "react";

function User({ u, deleteUser, updateUser }) {
  return (
    <div>
      <div>{u.name}</div>
      <div>{u.age}</div>
      <button onClick={deleteUser}>delete user</button>
      <button onClick={updateUser}>update user</button>
    </div>
  );
}

export default User;
