import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export interface IAdminLayoutProps { }

const AdminLayout: React.FunctionComponent<IAdminLayoutProps> = (props) => (
  <Fragment>
    <Navbar />
    <main className="admin_cont_wrapper">
      <div className="admin_sidebar">
        <Sidebar />
      </div>
      <div className="admin_content">
        <Outlet />
      </div>
    </main>
  </Fragment>
);

export default AdminLayout;
