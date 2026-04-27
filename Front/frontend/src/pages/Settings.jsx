import React from "react";

const Settings = () => {
  return (
    <div>
      <h2 className="mb-4">Settings</h2>

      <div className="card p-4 mb-3">
        <h5>Profile</h5>
        <input className="form-control mb-2" placeholder="Name" />
        <input className="form-control mb-2" placeholder="Email" />
        <button className="btn btn-primary">Update Profile</button>
      </div>

      <div className="card p-4 mb-3">
        <h5>Security</h5>
        <input className="form-control mb-2" placeholder="New Password" />
        <button className="btn btn-warning">Change Password</button>
      </div>

      <div className="card p-4">
        <h5>Preferences</h5>
        <button className="btn btn-dark">Dark Mode</button>
      </div>
    </div>
  );
};

export default Settings;