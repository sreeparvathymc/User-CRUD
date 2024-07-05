import React from "react";
import { Route, Routes } from "react-router-dom";
import Table from "../Table/Table";
import Create from "../Create/Create";
import View from "../View/View";
import Edit from "../Edit/Edit";

const Approute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Table />}></Route>

        <Route path="/create" element={<Create />}></Route>

        <Route path="/view/:id" element={<View />}></Route>

        <Route path="/edit/:id" element={<Edit />}></Route>

      </Routes>
    </div>
  );
};

export default Approute;
