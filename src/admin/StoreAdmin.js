import { Admin, Resource, EditGuesser, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { PostList } from "./posts";
import Dashboard from "./Dashboard";
import {
  CommentList,
  CommentShow,
  CommentCreate,
  CommentEdit,
} from "./comments";

import { dataProvider, authProvider } from "../firebase-config";

function StoreAdmin() {
  return (
    <Admin basename="/admin" dashboard={Dashboard} dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
      <Resource name="posts" list={PostList} edit={EditGuesser} />
      <Resource
        name="comments"
        // icon={CommentIcon}
        list={CommentList}
        show={CommentShow}
        create={CommentCreate}
        edit={CommentEdit}
      />
    </Admin>
  );
}
export default StoreAdmin;
