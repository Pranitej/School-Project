import React, { useState } from "react";
import ShowChildren from "./ShowChildren";
import ShowChildDetails from "./ShowChildDetails";
import ShowAllChildrenInTable from "./ShowAllChildrenInTable";

export default function ChildrenDashboard() {
  const [currentChild, setCurrentChild] = useState(null);

  return (
    <div className="bg-white">
      <br></br>
      <div className="mt-5">
        <div className="row">
          {/* First Column (sm-col-2) */}
          <div className="col-sm-2 overflow-auto">
            <h4 className="text-primary text-center p-2">Children</h4>
            {/* <button
              type="button"
              className="btn btn-sm btn-dark btn-rounded"
              data-toggle="modal"
              data-target="#addEmployee"
            >
              <i className="fas fa-plus"></i>
            </button> */}
            <ShowChildren
              currentChild={currentChild}
              setCurrentChild={setCurrentChild}
            />
          </div>
          <div className="col-sm-10 overflow-auto">
            {currentChild ? (
              <ShowChildDetails
                currentChild={currentChild}
                setCurrentChild={setCurrentChild}
              />
            ) : (
              <ShowAllChildrenInTable />
            )}
          </div>
        </div>
        {/* <AddEmployee handleAddEmployee={handleAddEmployee} /> */}
      </div>
    </div>
  );
}
