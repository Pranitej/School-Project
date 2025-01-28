import axios from "axios";
import React, { useState } from "react";
import { data } from "../../../App";
import { useContext } from "react";
import "./styles.css";

export default function CampusParentAndStudentContract() {
  const [formData, setFormData] = useState({
    parentGuardianName: "",
    initial1: "",
    initial2: "",
    initial3: "",
    initial4: "",
    initial5: "",
    initial6: "",
    initial7: "",
    initial8: "",
    initial9: "",
    initial10: "",
    initial11: "",
    initial12: "",
    familyExpectations: "",
    studentPickup: "",
    // checkboxes
    teachersAide: "No",
    officeWork: "No",
    achievementTesting: "No",
    cleaning: "No",
    fundraiser: "No",
    fieldTripChaperone: "No",
    specialEvents: "No",
    other: "No",
  });

  const checkInCode = useContext(data).parentData.checkInCode;

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData({
      ...formData,
      [id]: checked ? "Yes" : "No",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8091/api/campus-contracts/create`, {
        ...formData,
        checkInCode,
        isSubmitted: "Yes",
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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                Family Christian Academy and Parent/Guardian Name
                <input
                  className="form-control"
                  type="text"
                  value={formData.parentGuardianName}
                  id="parentGuardianName"
                  placeholder="parent/guardian name"
                  onChange={handleChange}
                  required
                />
                hereby enter into contract with the following understanding:
              </p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                1. We understand that FCA will do its best to keep the
                parents/guardians of its students adequately informed of the
                student's progress (or areas of concern In turn, we agree to
                bring any and all questions or areas of concern directly to
                teachers and the administration for proper consideration. FCA
                reserves the right to update policies and procedures throughout
                the course of the year that will improve standards of academic
                excellence.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial1}
                id="initial1"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                2. We, the parents/guardians of the enrolling student,
                understand it is the responsibility of the student/parents to
                cooperate with the learning process FCA provides. FCA is not
                responsible for forcing a child to learn. Rather, FCA will
                provide your child the best education, in the safest environment
                we are able to provide.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial2}
                id="initial2"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                3. We agree to abide by the Financial Contract entered into with
                Family Christian Academy as well as all policies and procedures
                agreed to at the time of enrollment. We understand that FCA
                hires teachers, purchases curricula and establishes its budgets
                based on the financial commitments of its parents. Any bank
                draft which is returned from our bank for "Insufficient Funds"
                will incur a penalty of $35.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial3}
                id="initial3"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                4. Family Christian Academy reserves the right to
                administratively withdraw a student if the parent or student
                does not cooperate with the school or the educational process.
                We agree that this decision may be made at the sole discretion
                of the administration. Withdrawing a student from the school
                does not absolve the parents/guard ians from fulfilling the
                financial policies to which they have agreed.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial4}
                id="initial4"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                5. We have read this Contract carefully and agree to abide by
                its terms. <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial5}
                id="initial5"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                6. This contract may not be voided except by action of the Board
                of Directors. <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial6}
                id="initial6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                7. We agree to keep a correct contact number with the school and
                understand that we will be contacted if the student needs
                removal from the school or school function. If contacted, we
                will immediately come to the school or function and remove the
                student upon the school's request.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial7}
                id="initial7"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                8. We agree that the student will be dressed in the proper
                school uniform while on campus. (see FCA's On Campus Policies
                for Dress Code details). Students not adhering to the dress code
                will first be re quired to purchase dress code items from the
                school uniform shop and billed to parents, or the student will
                be sent home.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial8}
                id="initial8"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                9. Changes to classes may be made by Change Order only. Changes
                will be approved based on availability and at the discretion of
                the administration. If student is transferring to a program with
                a lower monthly tuition fee, it is agreed that the tuition
                payment will remain the same as original plan upon. Change
                orders are $50 and parent is responsible for purchasing any new
                books or curriculum that may needed. (No refunds on curriculum
                or online coursework).
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial9}
                id="initial9"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                10. Should we fail to meet any of the financial commitment to
                which we have agreed: Family Christian Academy will place a hold
                on student's online work or refuse admittance to on campus
                enrollees until the finances are brought current.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial10}
                id="initial10"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                11. I/we understand that we are the supervisors of our student's
                online coursework. We will keep our student motivated to
                complete his/her coursework in a timely manner so teachers may
                do the work of helping and encouraging our students and the
                Administration may provide grades in a timely manner. We will
                continually monitor our student's progress as well as the
                student-teacher messages. We also agree to provide FCA, not
                later than the due dates, with Attendance & Progress reports for
                all schoolwork completed that is not online.
                <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial11}
                id="initial11"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <p>
                12. We understand that the work our student submits through the
                Online Academy must be solely the student's own work. Both
                quizzes and tests must be completed by the student independent
                of any help. All quizzes (self-tests) are open book, meaning
                that the student may exit and return to the daily lessons to
                find answers to any quiz questions to which he/she is uncertain.
                Tests are not open book and students are encouraged to review
                all lessons and quizzes (self-tests) before attempting to enter
                a test. <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="form-control"
                type="text"
                value={formData.initial12}
                id="initial12"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-12">
              <p>
                What expectations do you have of Family Christian Academy
                regarding your child(ren)?
              </p>
              <textarea
                name="familyExpectations"
                className="form-control"
                id="familyExpectations"
                rows="3"
                value={formData.familyExpectations}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-12">
              <p>
                Will anybody besides parents be picking up student at school? If
                yes, please list their names and relationship to student. Any
                names not listed will not be permitted to pick up student.
              </p>
              <textarea
                name="studentPickup"
                id="studentPickup"
                className="form-control"
                rows="3"
                value={formData.studentPickup}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <h5>
                In which ways would you like to volunteer to help the school?
              </h5>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="teachersAide"
                  checked={formData.teachersAide === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="teachersAide">
                  Teacher's Aide
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="officeWork"
                  checked={formData.officeWork === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="officeWork">
                  Office Work
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="achievementTesting"
                  checked={formData.achievementTesting === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="achievementTesting"
                >
                  Achievement Testing
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="cleaning"
                  checked={formData.cleaning === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="cleaning">
                  Cleaning
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fundraiser"
                  checked={formData.fundraiser === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="fundraiser">
                  Fundraiser
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fieldTripChaperone"
                  checked={formData.fieldTripChaperone === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="fieldTripChaperone"
                >
                  Field Trip Chaperone
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="specialEvents"
                  checked={formData.specialEvents === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="specialEvents">
                  Special Events
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="other"
                  checked={formData.other === "Yes"}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary btn-sm mt-3">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
