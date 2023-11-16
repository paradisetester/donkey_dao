import React, { FC, useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import logging from "./config/logging";
import LayoutComponent from "./components/Layout";
import HomePage from "./pages/Home";
import DAOPage from "./pages/DAO";
import DrovePage from "./pages/Drove";
import { AdminLayout } from "./components/layout/admin";
import { Dashboard, Proposal, SettingDashboard, Whitepaper } from "./components/admin";
import { Vote, AddVote, ListVote, AssetList } from "./components/admin";
import Login from "./components/admin/Forms/login";
import Signup from "./components/admin/Forms/signup";
import Forgot_password from "./components/admin/Forms/forgot_password";
import New_password from "./components/admin/Forms/new_password";
import DaoVotePage from "./pages/dao/DaoVotePage";
import { RootState } from "./rootReducer";
import { useSelector } from "react-redux";
import Landing from "./pages/Landing";
import Maintenance from "./pages/MaintancePage";
import PageFound from "./pages/PageFound";

const PrivateOutlet: FC = ({ children }) => {
  let is_authenticated = useSelector((state: RootState) => {
    return state.authReducer["is_authenticated"];
  });

  return is_authenticated ? ( //Check if logged in
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" replace /> //Go back to login if not logged in
  );
};

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = () => {
  useEffect(() => {
    logging.info("Loading application.");
  }, []);
  const maintenance = false

  return (
    <BrowserRouter>
      <Routes>
        {
          maintenance ? (
            <>


              <Route path="/" element={<Maintenance />} />
              <Route path="*" element={<Maintenance />} />

            </>
          ) :
            (
              <>
              <Route path="*" element={<PageFound />} />

                <Route path="" element={<Landing />} />
                <Route element={<LayoutComponent />}>
                  <Route path="/home" element={<HomePage />} />

                  <Route path="/dao" element={<DAOPage />} />
                  <Route path="dao">
                    <Route index element={<DAOPage />} />
                    <Route path="vote/:voteId" element={<DaoVotePage />} />
                  </Route>

                  <Route path="/drove" element={<DrovePage />} />
                </Route>
                <Route path="/admin/login" element={<Login />} />
                {/* <Route path="/admin/signup" element={<Signup />} /> */}
               

                <Route
                  path="/admin"
                  element={
                    <>
                      <PrivateOutlet />
                      <AdminLayout />
                      {/* <Route path="/admin/new_password" element={<New_password />} />
                      
                      <Route path="/admin/forgot_password" element={<Forgot_password />} /> */}
                    </>
                  }
                >
                  <Route index element={<Dashboard />} />
                  {/* <Route path="/admin/login" element={<Login />}> */}

                  <Route path="vote">
                    <Route index element={<ListVote />} />
                    <Route path="create" element={<AddVote />} />
                    <Route path=":voteId" element={<Vote />} />
                    {/* <Route path="edit/:voteId" element={<EditVote />} /> */}
                    <Route path="list" element={<ListVote />} />
                  </Route>
                  <Route path="proposal">
                    <Route index element={<ListVote />} />
                    <Route path="create" element={<Proposal />} />
                    {/* <Route path="edit/:voteId" element={<EditVote />} /> */}
                    {/* <Route path="list" element={<ListVote />} /> */}
                  </Route>
                  <Route path="whitepaper">
                    <Route index element={<ListVote />} />
                    <Route path="create" element={<Whitepaper />} />
                    {/* <Route path="edit/:voteId" element={<EditVote />} /> */}
                    {/* <Route path="list" element={<ListVote />} /> */}
                  </Route>
                  <Route path="setting">
                    <Route path="" element={<SettingDashboard />} />
                  </Route>
                </Route>
              </>
            )}
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
