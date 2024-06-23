import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers for the phone field
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", email: "", address: "", phone: "" });
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Address: </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label>Phone No: </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              minLength={10}
              maxLength={10}
              required
              className="form-control"
              pattern="\d*"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          {user && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
