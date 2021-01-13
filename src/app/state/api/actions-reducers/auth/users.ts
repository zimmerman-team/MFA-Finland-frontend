import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const users: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_AUTH_API}/users`),
};

export default users;
