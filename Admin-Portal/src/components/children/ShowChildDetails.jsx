import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowChildFamilyDetails from "./ShowChildFamilyDetails";

export default function ShowChildDetails({ currentChild }) {
  const [currentFamily, setCurrentFamily] = useState(null);

  const getCurrentFamilyDetails = () => {
    axios
      .get(
        `http://localhost:8091/api/families/getFamilyByCheckInCode/${currentChild.checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          setCurrentFamily(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getCurrentFamilyDetails(), [currentChild]);

  return (
    <div>
      {currentFamily && (
        <ShowChildFamilyDetails
          familyObj={currentFamily}
          currentChild={currentChild}
        />
      )}
    </div>
  );
}
