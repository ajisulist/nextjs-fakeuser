import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { User, UserAPIReq, UserAPIRes } from "../../../shared/contracts/User";

import useDebounce from "../../../shared/hooks/useDebounce";

import { get } from "../../../shared/utils/api";

export type UserDataState = {
  users: Array<User>;
  status: "LOADING" | "ERROR" | "SUCCESS";
  errorMessage?: string;
};

export type UserTableMetaState = {
  sortBy?: string;
  sortOrder?: "ascend" | "descend";
  results: number;
  page: number;
};

const initialUserDataState: UserDataState = {
  users: [],
  status: "LOADING",
};

const UserDataStateContext = createContext<UserDataState>(initialUserDataState);
UserDataStateContext.displayName = "UserDataStateContext";

const UserTableMetaStateContext = createContext<UserTableMetaState>({
  page: 1,
  results: 10,
});
UserTableMetaStateContext.displayName = "UserTableMetaStateContext";
const UserTableMetaDispatchContext = createContext<
  Dispatch<SetStateAction<UserTableMetaState>>
>(() => {
  // no-op
});

type Props = {
  keyword: string;
  gender: User["gender"] | "";
  children: ReactNode;
};

const UserDataProvider = (props: Props) => {
  const [tableState, setTableState] =
    useState<UserDataState>(initialUserDataState);

  const [tableMetaState, setTableSortState] = useState<UserTableMetaState>({
    page: 1,
    results: 20,
  });

  const debouncedSortBy = useDebounce(tableMetaState.sortBy, 300);
  const debouncedSortOrder = useDebounce(tableMetaState.sortOrder, 300);
  const debouncedPage = useDebounce(tableMetaState.page, 300);

  const loadUser = async (params: UserAPIReq) => {
    try {
      setTableState((prev) => ({
        ...prev,
        status: "LOADING",
      }));
      const res = await get<UserAPIRes>("/api", {
        ...params,
        // Gender filter is bugged when using custom seed :(
        // seed: '18e5c6a3fb719df9',
      });
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
      }
      setTableState((prev) => ({
        ...prev,
        status: "ERROR",
      }));
    }
  };

  useEffect(() => {
    loadUser({
      page: debouncedPage.toString(),
      results: tableMetaState.results.toString(),
      keyword: props.keyword,
      gender: props.gender,
      sortBy: debouncedSortBy,
      sortOrder: debouncedSortOrder,
    });
  }, [
    props.keyword,
    props.gender,
    tableMetaState.results,
    debouncedSortBy,
    debouncedSortOrder,
    debouncedPage,
  ]);

  return (
    <UserDataStateContext.Provider value={tableState}>
      <UserTableMetaStateContext.Provider value={tableMetaState}>
        <UserTableMetaDispatchContext.Provider value={setTableSortState}>
          {props.children}
        </UserTableMetaDispatchContext.Provider>
      </UserTableMetaStateContext.Provider>
    </UserDataStateContext.Provider>
  );
};

export const useUserDataState = () => {
  return useContext(UserDataStateContext);
};

export const useUserTableMeta = (): [
  UserTableMetaState,
  Dispatch<SetStateAction<UserTableMetaState>>
] => {
  return [
    useContext(UserTableMetaStateContext),
    useContext(UserTableMetaDispatchContext),
  ];
};

export default UserDataProvider;
