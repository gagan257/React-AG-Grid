import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSave }) => {
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", email: "", address: "", phone: "" });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <span className="p-2">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
          />
        </span>
        <span className="p-2">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </span>
        <span className="p-2">
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </span>
        <span className="p-2">
          <label>Phone No: </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength={10}
            maxLength={10}
            required
          />
        </span>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-3 mb-3"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
