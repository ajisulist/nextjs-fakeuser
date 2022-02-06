import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, UserAPIReq, UserAPIRes } from "../../../shared/contracts/User";
import { get } from "../../../shared/utils/api";

const RESULTS_PER_PAGE = 10;

type UserTableState = {
  users: Array<User>;
  status: "LOADING" | "ERROR" | "SUCCESS";
  errorMessage?: string;
};

const initialTableState: UserTableState = {
  users: [],
  status: "LOADING",
};

const UserDataStateContext = createContext<UserTableState>(initialTableState);

type Props = {
  keyword: string;
  gender: User["gender"] | "";
  children: ReactNode;
};

const UserDataProvider = (props: Props) => {
  const [tableState, setTableState] =
    useState<UserTableState>(initialTableState);

  const loadUser = async (params: UserAPIReq) => {
    try {
      setTableState((prev) => ({
        ...prev,
        status: "LOADING",
      }));
      const res = await get<UserAPIRes>("/api", params);
      if (res.errorMsg) {
        setTableState((prev) => ({
          ...prev,
          status: "ERROR",
          errorMessage: res.errorMsg,
        }));
      } else {
        setTableState((prev) => ({
          ...prev,
          status: "SUCCESS",
          users: res.results,
        }));
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
        console.log("ERROR");
      }
    }
  };

  useEffect(() => {
    loadUser({
      page: "1",
      results: RESULTS_PER_PAGE.toString(),
      keyword: props.keyword,
      gender: props.gender,
    });
  }, [props.keyword, props.gender]);

  return (
    <UserDataStateContext.Provider value={tableState}>
      {props.children}
    </UserDataStateContext.Provider>
  );
};

export const useUserDataState = () => {
  return useContext(UserDataStateContext);
};

export default UserDataProvider;
