import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const deleteUser: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_AUTH_API}/users/delete/:id`),
};

export default deleteUser;
