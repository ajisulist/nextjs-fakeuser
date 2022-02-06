export type User = {
  gender: "male" | "female";
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
    email: string;
  };
  registered: {
    date: string;
  };
};
