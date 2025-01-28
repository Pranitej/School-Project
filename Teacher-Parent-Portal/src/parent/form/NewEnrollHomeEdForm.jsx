import React from "react";
import StudentInformationForm from "./StudentInformationForm";
import MotherOrGuardianForm from "./MotherOrGuardianForm";
import FatherOrGuardianForm from "./FatherOrGuardianForm";
import StudentChurchInformationForm from "./StudentChurchInformation";

export default function NewEnrollHomeEdForm() {
  return (
    <div>
      <div class="container mt-4">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <h3 class="text-center">FCA Family Information Form</h3>

            <div class="accordion mt-4 mb-3" id="studentInfoAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#studentInformation"
                    aria-expanded="false"
                    aria-controls="studentInformation"
                  >
                    Student Information
                  </button>
                </h2>
                <div
                  id="studentInformation"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div class="accordion-body">
                    <StudentInformationForm />
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#MOTHERGUARDIANINFORMATION"
                    aria-expanded="false"
                    aria-controls="MOTHERGUARDIANINFORMATION"
                  >
                    Mother/Guardian Information
                  </button>
                </h2>
                <div
                  id="MOTHERGUARDIANINFORMATION"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div class="accordion-body">
                    <MotherOrGuardianForm />
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#FATHERGUARDIANINFORMATION"
                    aria-expanded="false"
                    aria-controls="FATHERGUARDIANINFORMATION"
                  >
                    Father/Guardian Information
                  </button>
                </h2>
                <div
                  id="FATHERGUARDIANINFORMATION"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div class="accordion-body">
                    <FatherOrGuardianForm />
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#ChurchInformation"
                    aria-expanded="false"
                    aria-controls="ChurchInformation"
                  >
                    Student Church Information
                  </button>
                </h2>
                <div
                  id="ChurchInformation"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#studentInfoAccordion"
                >
                  <div class="accordion-body">
                    <StudentChurchInformationForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
