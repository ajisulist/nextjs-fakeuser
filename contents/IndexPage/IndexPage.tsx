import React, { useEffect } from "react";

import { User } from "../../shared/contracts/User";

import useDebouncedState from "../../shared/hooks/useDebouncedState";

import UserTable from "./components/UserTable";
import UserDataProvider from "./contexts/UserDataProvider";

function IndexPage() {
  const [keyword, setKeyword, debouncedKeyword] = useDebouncedState<string>(
    "",
    300
  );
  const [gender, setGender, debouncedGender] = useDebouncedState<
    User["gender"] | ""
  >("", 300);

  useEffect(() => {
    console.log(debouncedKeyword);
  }, [debouncedKeyword]);
  useEffect(() => {
    console.log(debouncedGender);
  }, [debouncedGender]);

  const handleResetFilter = () => {
    setKeyword("");
    setGender("");
  };

  return (
    <>
      <h1>Fake User Data Table</h1>
      <h2>
        A simple app to display user list created using Next.js and
        tandomuser.me.
      </h2>
      <div>
        <input
          value={keyword}
          onChange={(evt) => {
            setKeyword(evt.currentTarget.value);
          }}
        />
        <select
          value={gender}
          onChange={(evt) => {
            setGender(evt.currentTarget.value as User["gender"] | "");
          }}
        >
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button onClick={handleResetFilter}>Reset Filter</button>
      </div>
      <UserDataProvider keyword={debouncedKeyword} gender={debouncedGender}>
        <UserTable />
      </UserDataProvider>
    </>
  );
}

export default IndexPage;
