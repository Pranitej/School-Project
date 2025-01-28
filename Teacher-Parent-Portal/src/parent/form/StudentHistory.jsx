import axios from "axios";
import React from "react";
import { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import "./styles.css";

export default function StudentHistory() {
  const [formData, setFormData] = useState({
    // Schools Attended
    school1Name: "",
    school1GradeLevels: "",
    school1ReasonLeft: "",
    school2Name: "",
    school2GradeLevels: "",
    school2ReasonLeft: "",
    school3Name: "",
    school3GradeLevels: "",
    school3ReasonLeft: "",
    // Honors/Awards
    honorsAwards: "",
    // Student Level
    studentLevel: "",
    explanation: "",
    // History
    expelled: "No",
    inSchoolOutSchoolSuspension: "No",
    deniedEnrollment: "No",
    deniedEnrollmentExplanation: "",
    skippedGrade: "No",
    repeatedGrade: "No",
    repeatedGradeExplanation: "",
    // Special Conditions
    regularMedication: "No",
    learningDifficulties: "No",
    addAdhd: "No",
    specialEdClass: "No",
    requireTutoring: "No",
    ifSoExplain: "",
    // Mental/Emotional/Physical Issues
    mentalEmotionalPhysicalIssues: "",
    // School Awareness
    schoolAwareness: "",
    // Health
    studentHealth: "",
    // Mother's Health
    motherHealth: "",
    poorMotherHealthExplanation: "",
    // Father's Health
    fatherHealth: "",
    poorFatherHealthExplanation: "",
    // Conditions
    chickenPox: "No",
    diphtheria: "No",
    whoopingCough: "No",
    asthma: "No",
    mono: "No",
    muscularDystrophy: "No",
    frequentStrepThroat: "No",
    epilepsy: "No",
    measles: "No",
    seizures: "No",
    rheumaticFever: "No",
    cysticFibrosis: "No",
    heartCondition: "No",
    frequentEarInfections: "No",
    h1n1FluVirus: "No",
    diabetes: "No",
    mumps: "No",
    pneumonia: "No",
    tuberculosis: "No",
    arthritis: "No",
    addAdhdCondition: "No", // Changed to match entity name
    frequentHeadaches: "No",
    smallPox: "No",
    tonsillitis: "No",
    otherConditions: "No",
    specificConditions: "",
    // Allergies
    allergies: "",
    // Health Instructions
    healthInstructions: "",
    // Emergency Contact
    emergencyContactFirstName: "",
    emergencyContactLastName: "",
    relationshipToStudent: "", // Changed to match entity name
    homePhone: "",
    workPhone: "",
    cellPhone: "",
    isSubmitted: "No", // Assuming this doesn't need initial user input
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`http://localhost:8091/api/student-history/createStudentHistory`, {
        ...formData,
        isSubmitted: "Yes",
        checkInCode,
      })
      .then((response) => {
        if (response.data) {
          alert("Form Submitted...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="">
      <div className="">
        <h5 className="mb-3">
          List all schools attended from kindergarten to present:
        </h5>

        <div className="mb-3">
          <label htmlFor="school1Name" className="form-label">
            School Name
          </label>
          <input
            type="text"
            className="form-control"
            id="school1Name"
            value={formData.school1Name}
            onChange={(e) =>
              setFormData({ ...formData, school1Name: e.target.value })
            }
            placeholder="Enter School Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="school1GradeLevels" className="form-label">
            Grade Levels
          </label>
          <input
            type="text"
            className="form-control"
            id="school1GradeLevels"
            placeholder="Enter Grade Levels"
            value={formData.school1GradeLevels}
            onChange={(e) =>
              setFormData({ ...formData, school1GradeLevels: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="school1ReasonLeft" className="form-label">
            Reason Left
          </label>
          <input
            type="text"
            className="form-control"
            id="school1ReasonLeft"
            placeholder="Enter Reason Left"
            value={formData.school1ReasonLeft}
            onChange={(e) =>
              setFormData({ ...formData, school1ReasonLeft: e.target.value })
            }
          />
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="school2Name" className="form-label">
            School 2 Name
          </label>
          <input
            type="text"
            className="form-control"
            id="school2Name"
            placeholder="Enter School Name"
            value={formData.school2Name}
            onChange={(e) =>
              setFormData({ ...formData, school2Name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="school2GradeLevels" className="form-label">
            Grade Levels
          </label>
          <input
            type="text"
            className="form-control"
            id="school2GradeLevels"
            placeholder="Enter Grade Levels"
            value={formData.school2GradeLevels}
            onChange={(e) =>
              setFormData({ ...formData, school2GradeLevels: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="school2ReasonLeft" className="form-label">
            Reason Left
          </label>
          <input
            type="text"
            className="form-control"
            id="school2ReasonLeft"
            placeholder="Enter Reason Left"
            value={formData.school2ReasonLeft}
            onChange={(e) =>
              setFormData({ ...formData, school2ReasonLeft: e.target.value })
            }
          />
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="school3Name" className="form-label">
            School 3 Name
          </label>
          <input
            type="text"
            className="form-control"
            id="school3Name"
            placeholder="Enter School Name"
            value={formData.school3Name}
            onChange={(e) =>
              setFormData({ ...formData, school3Name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="gradeLevels" className="form-label">
            Grade Levels
          </label>
          <input
            type="text"
            className="form-control"
            id="gradeLevels"
            placeholder="Enter Grade Levels"
            value={formData.school3GradeLevels}
            onChange={(e) =>
              setFormData({ ...formData, school3GradeLevels: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reasonLeft" className="form-label">
            Reason Left
          </label>
          <input
            type="text"
            className="form-control"
            id="reasonLeft"
            placeholder="Enter Reason Left"
            value={formData.school3ReasonLeft}
            onChange={(e) =>
              setFormData({ ...formData, school3ReasonLeft: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="honorsAwards" className="form-label">
            Honors/Awards
          </label>
          <textarea
            className="form-control"
            id="honorsAwards"
            rows="2"
            value={formData.honorsAwards}
            onChange={(e) =>
              setFormData({ ...formData, honorsAwards: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="studentLevel" className="form-label">
            Student Level
          </label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="studentLevel"
              id="aboveGradeLevel"
              value="Above Grade Level"
              checked={formData.studentLevel === "Above Grade Level"}
              onChange={() =>
                setFormData({ ...formData, studentLevel: "Above Grade Level" })
              }
            />
            <label className="form-check-label" htmlFor="aboveGradeLevel">
              Above Grade Level
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="studentLevel"
              id="atGradeLevel"
              value="At Grade Level"
              checked={formData.studentLevel === "At Grade Level"}
              onChange={() =>
                setFormData({ ...formData, studentLevel: "At Grade Level" })
              }
            />
            <label className="form-check-label" htmlFor="atGradeLevel">
              At Grade Level
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="studentLevel"
              id="belowGradeLevel"
              value="Below Grade Level"
              checked={formData.studentLevel === "Below Grade Level"}
              onChange={() =>
                setFormData({ ...formData, studentLevel: "Below Grade Level" })
              }
            />
            <label className="form-check-label" htmlFor="belowGradeLevel">
              Below Grade Level
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="studentLevel"
              id="notSure"
              value="Not Sure"
              checked={formData.studentLevel === "Not Sure"}
              onChange={() =>
                setFormData({ ...formData, studentLevel: "Not Sure" })
              }
            />
            <label className="form-check-label" htmlFor="notSure">
              Not Sure
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="explanation" className="form-label">
            Explain
          </label>
          <textarea
            className="form-control"
            id="explanation"
            rows="2"
            value={formData.explanation}
            onChange={(e) =>
              setFormData({ ...formData, explanation: e.target.value })
            }
          ></textarea>
        </div>

        <h5 className="mt-3">Has student ever been</h5>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="expelled"
            checked={formData.expelled === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                expelled: formData.expelled === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="expelled">
            Expelled
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="inSchoolOutSchoolSuspension"
            checked={formData.inSchoolOutSchoolSuspension === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                inSchoolOutSchoolSuspension:
                  formData.inSchoolOutSchoolSuspension === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label
            className="form-check-label"
            htmlFor="inSchoolOutSchoolSuspension"
          >
            In-School/Out-of-School Suspension
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="deniedEnrollment"
            checked={formData.deniedEnrollment === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                deniedEnrollment:
                  formData.deniedEnrollment === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="deniedEnrollment">
            Denied Enrollment
          </label>
          <div className="form-group mt-2">
            <textarea
              className="form-control"
              id="deniedEnrollmentExplanation"
              rows="2"
              placeholder="If so, please explain"
              value={formData.deniedEnrollmentExplanation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deniedEnrollmentExplanation: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
        <h5 className="mt-3">Has student ever</h5>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="skippedGrade"
            checked={formData.skippedGrade === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                skippedGrade: formData.skippedGrade === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="skippedGrade">
            Skipped a grade? If so, please explain below.
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="repeatedGrade"
            checked={formData.repeatedGrade === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                repeatedGrade: formData.repeatedGrade === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="repeatedGrade">
            Repeated a grade? If so, please explain below.
          </label>
          <div className="form-group mt-2">
            <textarea
              className="form-control"
              id="repeatedGradeExplanation"
              rows="2"
              placeholder="If so, please explain"
              value={formData.repeatedGradeExplanation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  repeatedGradeExplanation: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
        <h3 className="mt-3">Does the student (check if yes)</h3>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="regularMedication"
            checked={formData.regularMedication === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                regularMedication:
                  formData.regularMedication === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="regularMedication">
            Take regular medication
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="learningDifficulties"
            checked={formData.learningDifficulties === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                learningDifficulties:
                  formData.learningDifficulties === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="learningDifficulties">
            Have Learning difficulties
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="addAdhd"
            checked={formData.addAdhd === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                addAdhd: formData.addAdhd === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="addAdhd">
            Have ADD or ADHD
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="specialEdClass"
            checked={formData.specialEdClass === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                specialEdClass:
                  formData.specialEdClass === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="specialEdClass">
            Attended special ed. Class
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="requireTutoring"
            checked={formData.requireTutoring === "Yes"}
            onChange={() => {
              setFormData({
                ...formData,
                requireTutoring:
                  formData.requireTutoring === "Yes" ? "No" : "Yes",
              });
            }}
          />
          <label className="form-check-label" htmlFor="requireTutoring">
            Require tutoring
          </label>
        </div>

        <h5>If so, please explain:</h5>
        <div className="form-group">
          <textarea
            className="form-control"
            id="ifSoExplain"
            rows="3"
            value={formData.ifSoExplain}
            onChange={(e) =>
              setFormData({ ...formData, ifSoExplain: e.target.value })
            }
          ></textarea>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="mentalEmotionalPhysicalIssues">
            Briefly describe if the student has any mental, emotional, or
            physical issues or has the student been affected by moving, illness,
            divorce, etc. which may affect their progress during the school
            year.
          </label>
          <textarea
            className="form-control"
            id="mentalEmotionalPhysicalIssues"
            rows="3"
            value={formData.mentalEmotionalPhysicalIssues}
            onChange={(e) =>
              setFormData({
                ...formData,
                mentalEmotionalPhysicalIssues: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="schoolAwareness">
            Is there anything the school should be aware of that will allow us
            to help the student personally or academically?
          </label>
          <textarea
            className="form-control"
            id="schoolAwareness"
            rows="3"
            value={formData.schoolAwareness}
            onChange={(e) =>
              setFormData({
                ...formData,
                schoolAwareness: e.target.value,
              })
            }
          ></textarea>
        </div>
        <h5>Student's Health</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="studentHealth"
            id="goodHealth"
            value="Good"
            checked={formData.studentHealth === "Good"}
            onChange={() => setFormData({ ...formData, studentHealth: "Good" })}
          />
          <label className="form-check-label" htmlFor="goodHealth">
            Good
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="studentHealth"
            id="fairHealth"
            value="Fair"
            checked={formData.studentHealth === "Fair"}
            onChange={() => setFormData({ ...formData, studentHealth: "Fair" })}
          />
          <label className="form-check-label" htmlFor="fairHealth">
            Fair
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="studentHealth"
            id="poorHealth"
            value="Poor"
            checked={formData.studentHealth === "Poor"}
            onChange={() => setFormData({ ...formData, studentHealth: "Poor" })}
          />
          <label className="form-check-label" htmlFor="poorHealth">
            Poor
          </label>
        </div>

        <h5 className="mt-3">Mother's Health</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="motherHealth"
            id="goodMotherHealth"
            value="Good"
            checked={formData.motherHealth === "Good"}
            onChange={() => setFormData({ ...formData, motherHealth: "Good" })}
          />
          <label className="form-check-label" htmlFor="goodMotherHealth">
            Good
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="motherHealth"
            id="fairMotherHealth"
            value="Fair"
            checked={formData.motherHealth === "Fair"}
            onChange={() => setFormData({ ...formData, motherHealth: "Fair" })}
          />
          <label className="form-check-label" htmlFor="fairMotherHealth">
            Fair
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="motherHealth"
            id="poorMotherHealth"
            value="Poor"
            checked={formData.motherHealth === "Poor"}
            onChange={() => setFormData({ ...formData, motherHealth: "Poor" })}
          />
          <label className="form-check-label" htmlFor="poorMotherHealth">
            Poor
          </label>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="poorMotherHealthExplanation">If poor, explain:</label>
          <textarea
            className="form-control"
            id="poorMotherHealthExplanation"
            rows="2"
            value={formData.poorMotherHealthExplanation}
            onChange={(e) =>
              setFormData({
                ...formData,
                poorMotherHealthExplanation: e.target.value,
              })
            }
          ></textarea>
        </div>
        <h5 className="mt-3">Father's Health</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="fatherHealth"
            id="goodFatherHealth"
            value="Good"
            checked={formData.fatherHealth === "Good"}
            onChange={() => setFormData({ ...formData, fatherHealth: "Good" })}
          />
          <label className="form-check-label" htmlFor="goodFatherHealth">
            Good
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="fatherHealth"
            id="fairFatherHealth"
            value="Fair"
            checked={formData.fatherHealth === "Fair"}
            onChange={() => setFormData({ ...formData, fatherHealth: "Fair" })}
          />
          <label className="form-check-label" htmlFor="fairFatherHealth">
            Fair
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="fatherHealth"
            id="poorFatherHealth"
            value="Poor"
            checked={formData.fatherHealth === "Poor"}
            onChange={() => setFormData({ ...formData, fatherHealth: "Poor" })}
          />
          <label className="form-check-label" htmlFor="poorFatherHealth">
            Poor
          </label>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="poorFatherHealthExplanation">If poor, explain:</label>
          <textarea
            className="form-control"
            id="poorFatherHealthExplanation"
            rows="2"
            value={formData.poorFatherHealthExplanation}
            onChange={(e) =>
              setFormData({
                ...formData,
                poorFatherHealthExplanation: e.target.value,
              })
            }
          ></textarea>
        </div>

        <h5>
          Has the student had any of the following conditions? (check all that
          apply)
        </h5>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="chickenPox"
            checked={formData.chickenPox === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                chickenPox: formData.chickenPox === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="chickenPox">
            Chicken Pox
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="diphtheria"
            checked={formData.diphtheria === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                diphtheria: formData.diphtheria === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="diphtheria">
            Diphtheria
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="whoopingCough"
            checked={formData.whoopingCough === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                whoopingCough: formData.whoopingCough === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="whoopingCough">
            Whooping Cough
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="asthma"
            checked={formData.asthma === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                asthma: formData.asthma === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="asthma">
            Asthma
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="mono"
            checked={formData.mono === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                mono: formData.mono === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="mono">
            Mono
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="muscularDystrophy"
            checked={formData.muscularDystrophy === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                muscularDystrophy:
                  formData.muscularDystrophy === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="muscularDystrophy">
            Muscular Dystrophy
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="frequentStrepThroat"
            checked={formData.frequentStrepThroat === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                frequentStrepThroat:
                  formData.frequentStrepThroat === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="frequentStrepThroat">
            Frequent Strep Throat
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="epilepsy"
            checked={formData.epilepsy === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                epilepsy: formData.epilepsy === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="epilepsy">
            Epilepsy
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Measles"
            checked={formData.measles === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                measles: formData.measles === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Measles">
            Measles
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Seizures"
            checked={formData.seizures === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                seizures: formData.seizures === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Seizures">
            Seizures / Convulsions
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Rheumatic"
            checked={formData.rheumaticFever === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                rheumaticFever:
                  formData.rheumaticFever === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Rheumatic">
            Rheumatic Fever
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="CysticFibrosis"
            checked={formData.cysticFibrosis === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                cysticFibrosis:
                  formData.cysticFibrosis === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="CysticFibrosis">
            Cystic Fibrosis
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="HeartCondition"
            checked={formData.heartCondition === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                heartCondition:
                  formData.heartCondition === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="HeartCondition">
            Heart Condition
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="FrequentEarInfections"
            checked={formData.frequentEarInfections === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                frequentEarInfections:
                  formData.frequentEarInfections === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="FrequentEarInfections">
            Frequent Ear Infections
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="H1N1FluVirus"
            checked={formData.h1n1FluVirus === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                h1n1FluVirus: formData.h1n1FluVirus === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="H1N1FluVirus">
            H1N1 Flu Virus
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Diabetes"
            checked={formData.diabetes === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                diabetes: formData.diabetes === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Diabetes">
            Diabetes
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Mumps"
            checked={formData.mumps === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                mumps: formData.mumps === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Mumps">
            Mumps
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="pneumonia"
            checked={formData.pneumonia === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                pneumonia: formData.pneumonia === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="pneumonia">
            Pneumonia
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Tuberculosis"
            checked={formData.tuberculosis === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                tuberculosis: formData.tuberculosis === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Tuberculosis">
            Tuberculosis
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Arthritis"
            checked={formData.arthritis === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                arthritis: formData.arthritis === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Arthritis">
            Arthritis
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="ADDADHD"
            checked={formData.addAdhd === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                addAdhd: formData.addAdhd === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="ADDADHD">
            ADD/ADHD
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="FrequentHeadaches"
            checked={formData.frequentHeadaches === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                frequentHeadaches:
                  formData.frequentHeadaches === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="FrequentHeadaches">
            Frequent Headaches
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="SmallPox"
            checked={formData.smallPox === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                smallPox: formData.smallPox === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="SmallPox">
            Small Pox
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="Tonsillitis"
            checked={formData.tonsillitis === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                tonsillitis: formData.tonsillitis === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="Tonsillitis">
            Tonsillitis
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="otherConditions"
            checked={formData.otherConditions === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                otherConditions:
                  formData.otherConditions === "Yes" ? "No" : "Yes",
              })
            }
          />
          <label className="form-check-label" htmlFor="otherConditions">
            Other
          </label>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="specificConditions">
            List any illnesses/conditions or special health problems that are
            specific to your student and not included above:
          </label>
          <textarea
            className="form-control"
            id="specificConditions"
            rows="2"
            value={formData.specificConditions}
            onChange={(e) =>
              setFormData({ ...formData, specificConditions: e.target.value })
            }
          ></textarea>
        </div>

        <h5 className="mt-3">Allergies</h5>
        <div className="form-group">
          <label htmlFor="allergies">
            Any known allergies (please be specific medicines, food, insect
            bites, etc.):
          </label>
          <textarea
            className="form-control"
            id="allergies"
            rows="2"
            value={formData.allergies}
            onChange={(e) =>
              setFormData({ ...formData, allergies: e.target.value })
            }
          ></textarea>
        </div>
        <h5 className="mt-3">Health Instructions</h5>
        <div className="form-group">
          <label htmlFor="healthInstructions">
            List any specific instructions/procedures that need to be followed
            for your student's health and safety:
          </label>
          <textarea
            className="form-control"
            id="healthInstructions"
            rows="3"
            value={formData.healthInstructions}
            onChange={(e) =>
              setFormData({ ...formData, healthInstructions: e.target.value })
            }
          ></textarea>
        </div>

        <h5 className="mt-3">Name of Emergency Contact Person</h5>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={formData.emergencyContactFirstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContactFirstName: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={formData.emergencyContactLastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContactLastName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="relationship">Relationship to Student</label>
          <input
            type="text"
            className="form-control"
            id="relationship"
            placeholder="Relationship to Student"
            value={formData.relationshipToStudent}
            onChange={(e) =>
              setFormData({
                ...formData,
                relationshipToStudent: e.target.value,
              })
            }
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="homePhone">Telephone Home</label>
            <input
              type="tel"
              className="form-control"
              id="homePhone"
              placeholder="Telephone Home"
              value={formData.homePhone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  homePhone: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="workPhone">Telephone Work</label>
            <input
              type="tel"
              className="form-control"
              id="workPhone"
              placeholder="Telephone Work"
              value={formData.workPhone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  workPhone: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="cellPhone">Telephone Cell</label>
            <input
              type="tel"
              className="form-control"
              id="cellPhone"
              placeholder="Telephone Cell"
              value={formData.cellPhone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cellPhone: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-sm btn-primary mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
