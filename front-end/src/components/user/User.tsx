import React, { useState } from "react";

function User({ u, deleteUser }) {
  return (
    <div>
      <div>{u.name}</div>
      <div>{u.age}</div>
      <button onClick={deleteUser}>deleteuser</button>
    </div>
  );
}

export default User;
