import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = (user) => {
    if (user.id) {
      setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? user : u)));
    } else {
      user.id = Date.now();
      setUsers(prevUsers => [...prevUsers, user]);
    }
    setSelectedUser(null);
  };

  const handleEdit = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDeleteSelected = (ids) => {
    setUsers(prevUsers => prevUsers.filter(user => !ids.includes(user.id)));
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <UserForm user={selectedUser} onSave={handleSave} />
      <UserTable users={users} onEdit={handleEdit} onDeleteSelected={handleDeleteSelected} />
    </div>
  );
};

export default App;