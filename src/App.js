import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UserForm from "./components/UserForm";

// src/App.js

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const addUser = (user) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.email === user.email ? user : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  const deleteUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const columns = [
    { headerName: "Name", field: "name", editable: true, filter: true },
    { headerName: "Email", field: "email", editable: true, filter: true },
    { headerName: "Address", field: "address", editable: true, filter: true },
    { headerName: "Phone No", field: "phone", editable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params) => (
        <div>
          <button onClick={() => deleteUser(params.data.email)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm user={editingUser} onSave={addUser} />
      <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
        <AgGridReact
          rowData={users}
          columnDefs={columns}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            editable: true,
            filter: true,
          }}
        />
      </div>
    </div>
  );
};

export default App;
