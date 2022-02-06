export type User = {
  gender: "male" | "female";
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  registered: {
    date: string;
  };
};

export type UserAPIRes = {
  info: {
    page: number;
    results: number;
  };
  results: Array<User>;
  errorMsg?: string;
};

export type UserAPIReq = {
  page: string;
  results: string;
  keyword?: string;
  gender?: User["gender"] | "";
  sortBy?: string;
  sortOrder?: "ascend" | "descend" | "";
};
