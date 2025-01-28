import axios from "axios";
import React, { useState } from "react";
import { data } from "../../App";
import { useContext } from "react";
import "./styles.css";

export default function ParentAndStudentContract() {
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
  });

  const checkInCode = useContext(data).parentData.checkInCode;

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
      .post(
        `http://localhost:8091/api/parent-student-contract/createContract`,
        { ...formData, checkInCode, isSubmitted: "Yes" }
      )
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
          <div className="row">
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

          <div className="row">
            <div className="col-md-12">
              <p>
                1. We understand that FCA will do its best to keep the
                parents/guardians of its students adequately informed...{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                2. We, the parents/guardians of the enrolling student...{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                3. We agree to abide by the Financial Contract entered into with
                Family Christian Academy...{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                4. Family Christian Academy reserves the right to
                administratively withdraw a student...{" "}
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

          <div className="row">
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

          <div className="row">
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

          <div className="row">
            <div className="col-md-12">
              <p>
                7. We agree to keep a correct contact number with the school...{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                8. No refunds on curriculum or online coursework.{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                9. Should we fail to meet any of the financial commitments...{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                10. We understand that we are the supervisors of our student's
                online coursework... <span style={{ color: "red" }}>*</span>
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

          <div className="row">
            <div className="col-md-12">
              <p>
                11. We understand that the work our student submits through the
                Online Academy must be solely the student's own work...{" "}
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

          <div className="row">
            <div className="col-md-12">
              <p>
                12. No student may receive less than a 87% ("B") on any daily
                work... <span style={{ color: "red" }}>*</span>
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

          <div className="row">
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
