import React from "react";
import { useUserDataState } from "../contexts/UserDataProvider";

const UserTable = () => {
  const data = useUserDataState();
  if (data.status === "LOADING") {
    <h1>Loading....</h1>;
  }
  if (data.status === "LOADING") {
  }
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Register Date</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map((el, idx) => {
          const fullName = `${el.name.title} ${el.name.first} ${el.name.last}`;
          return (
            <tr>
              <td>{idx + 1}</td>
              <td>{el.login.username}</td>
              <td>{fullName}</td>
              <td>{el.email}</td>
              <td>{el.gender}</td>
              <td>{el.registered.date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
