import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import styled from "styled-components";
import Error404 from "../Error404";
import Navigation from "components/admin/molecules/Navigation";

import AddComponent from "components/admin/organisms/AddComponent";
import UpdateComponent from "components/admin/organisms/UpdateComponent";
import Components from "./pages/Components";
import DeleteComponent from "./organisms/DeleteComponent";

const AdminSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 100%;
  }
`;

const Admin = () => {
  //   const app = useSelector((store: StoreInterface) => store.app);
  return (
    <AdminSt>
      <Navigation />
      <Routes>
        <Route path="/components/:component" element={<Components />} />
        <Route path="/add-component/:component" element={<AddComponent />} />
        <Route path="/update-component/:component" element={<UpdateComponent />} />
        <Route path="/delete-component" element={<DeleteComponent />} />

        <Route path="/*" element={<Error404 />} />
      </Routes>
    </AdminSt>
  );
};

export default Admin;
