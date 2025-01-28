import React, { useState } from "react";
import AddFamily from "./AddFamily";
import ShowFamilies from "./ShowFamilies";
import ShowFamilyDetails from "./ShowFamilyDetails";

export default function FamilyDashboard() {
  const [familyObj, setFamilyObj] = useState(null);
  const [addFamilyCounter, setAddFamilyCounter] = useState(0); // State variable to trigger re-render

  const handleDataUpdate = (data) => {
    console.log("AAAA");
    // Update shared data
    setFamilyObj(data);
    console.log("family: " + data.familyName);
  };

  const handleAddFamily = () => {
    setAddFamilyCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div className="bg-white">
      <br></br>
      <div className="mt-5">
        <div className="row">
          {/* First Column (sm-col-2) */}
          <div className="col-sm-2 overflow-auto">
            <b className="text-primary ml-4">Families </b>
            <button
              type="button"
              className="btn btn-sm btn-dark btn-rounded"
              data-toggle="modal"
              data-target="#addFamily"
            >
              <i className="fas fa-plus"></i>
            </button>

            {/* Shows all families */}
            <ShowFamilies
              key={addFamilyCounter}
              familyObj={familyObj}
              handleDataUpdate={handleDataUpdate}
            />
          </div>

          {/* Second Column (sm-col-10) */}
          <div className="col-sm-10 overflow-auto">
            {/* Add your content for the second column */}
            <ShowFamilyDetails
              familyObj={familyObj}
              handleDataUpdate={handleDataUpdate}
            />
          </div>
        </div>
        <AddFamily handleAddFamily={handleAddFamily} />{" "}
        {/* Pass the function as prop */}
      </div>
    </div>
  );
}
