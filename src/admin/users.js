import { List, Datagrid, TextField, EmailField } from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
    </Datagrid>
  </List>
);
