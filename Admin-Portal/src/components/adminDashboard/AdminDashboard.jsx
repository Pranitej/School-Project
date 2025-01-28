import React, { useState } from "react";
import AdminActionsList from "./AdminActionsList";
import Classes from "./Classes";

export default function AdminDashboard() {
  const [currentAction, setCurrentAction] = useState("");
  const [actionList, _] = useState([
    {
      name: "Classes",
      component: <Classes />,
    },
  ]);

  return (
    <div className="">
      <div className="container-fluid mt-5">
        <div className="row mt-5 p-2">
          <div className="col-sm-2 overflow-auto text-center border-2 border-right border-dark">
            <h5 className="text-primary p-1 mt-3">Admin</h5>
            <AdminActionsList
              currentAction={currentAction}
              setCurrentAction={setCurrentAction}
              actionList={actionList}
            />
          </div>
          <div className="col-sm-10 mt-3">
            {currentAction ? (
              <div className="card p-3">
                {actionList.map((item, index) => (
                  <div key={index}>
                    {item.name === currentAction && item.component}
                  </div>
                ))}
              </div>
            ) : (
              <h5 className="text-danger mt-3">No Report is selected...</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
