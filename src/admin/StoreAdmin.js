import { Admin, Resource, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { PostList } from "./posts";
import Dashboard from "./Dashboard";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function StoreAdmin() {
  return (
    <Admin basename="/admin" dashboard={Dashboard} dataProvider={dataProvider}>
      <Resource name="users" list={UserList} recordRepresentation="name" />
      <Resource name="posts" list={PostList} edit={EditGuesser} />
    </Admin>
  );
}
export default StoreAdmin;
