import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UserForm from "./components/UserForm";

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
      field: "id",
      cellRendererFramework: (params) => (
        <div>
          <button
            variant="outlined"
            color="primary"
            className="btn"
            onClick={() => deleteUser(params.data)}
          >
            Update
          </button>
          <button
            variant="outlined"
            color="secondary"
            onClick={() => deleteUser(params.value)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="App container text-center">
      <h1 className="text-center mb-4 mt-3">User Management</h1>
      <UserForm user={editingUser} onSave={addUser} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <div
              className="ag-theme-alpine"
              style={{ height: 400, width: 800 }}
            >
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
        </div>
      </div>
    </div>
  );
};

export default App;
