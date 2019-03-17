import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div>
      <Link to="/client/add" className="btn btn-success">
        {" "}
        <i className="fas fa-plus fa-sm" /> New
      </Link>
    </div>
  );
}
