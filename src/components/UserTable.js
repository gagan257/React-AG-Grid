import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const UserTable = ({ users, onEdit, onDeleteSelected }) => {
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    if (gridApi) {
      gridApi.setRowData(users);
    }
  }, [users, gridApi]);

  const handleCellValueChanged = (event) => {
    const updatedUser = event.data;
    onEdit(updatedUser);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const getSelectedRows = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data.id);
    return selectedData;
  };

  const handleDeleteSelected = () => {
    const selectedIds = getSelectedRows();
    onDeleteSelected(selectedIds);
  };

  const columnDefs = [
    { headerName: 'Name', field: 'name', editable: true, filter: true },
    { headerName: 'Email', field: 'email', editable: true, filter: true },
    { headerName: 'Address', field: 'address', editable: true, filter: true },
    { headerName: 'Phone No', field: 'phone', editable: true, filter: true },
  ];

  return (
    <div className="d-flex flex-column">
      <div className="mb-2 d-flex justify-content-end">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSelected}
          
        >
          Delete 
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={onGridReady}
          onCellValueChanged={handleCellValueChanged}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default UserTable;
