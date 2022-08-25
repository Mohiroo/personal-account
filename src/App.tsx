import { Button, Layout } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import MyHeader from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import Account from "./pages/Account/Account";
import Login from "./pages/Login/Login";
import { authSlice } from "./store/Slices/AuthSlice";

const App: React.FC = () => {
  const { auth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { rejectAuthorization } = authSlice.actions;

  useEffect(() => console.log('render'))

  return (
    <Layout>
      <MyHeader auth={auth} onClick={() => auth && dispatch(rejectAuthorization())}/>
      <Content>
        <Routes>
          {auth ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/account" element={<Account />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
