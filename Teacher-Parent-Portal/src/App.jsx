import { useEffect, useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./utilities/Navbar";
import Login from "./login/Login";
import Register from "./login/Register";
import teacherRoutes from "./teacher/routes/TeacherRoutes";
import parentRoutes from "./parent/routes/ParentRoutes";
import PageNotFound from "./utilities/PageNotFound";

const data = createContext();

export default function App() {
  const [employeeData, setEmployeeData] = useState(true);
  const [parentData, setParentData] = useState(true);

  return (
    <>
      <data.Provider
        value={{ employeeData, setEmployeeData, parentData, setParentData }}
      >
        <BrowserRouter>
          {employeeData ? (
            <Navbar
              setEmployeeData={setEmployeeData}
              setParentData={setParentData}
            />
          ) : (
            parentData && (
              <Navbar
                setEmployeeData={setEmployeeData}
                setParentData={setParentData}
              />
            )
          )}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/teacher">
              {employeeData &&
                teacherRoutes.map((item, index) => (
                  <Route path={item.path} element={item.element} key={index} />
                ))}
            </Route>
            <Route path="/parent">
              {parentData &&
                parentRoutes.map((item, index) => (
                  <Route path={item.path} element={item.element} key={index} />
                ))}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </data.Provider>
    </>
  );
}

export { data };
