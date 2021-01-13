import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const updateUser: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_AUTH_API}/users/:id`),
};

export default updateUser;
