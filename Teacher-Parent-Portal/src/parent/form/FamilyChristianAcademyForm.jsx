import React from "react";

export default function Temp() {
  return (
    <div>
      <div class="container mt-5">
        <h3 class="text-center">FAMILY CHRISTIAN ACADEMY</h3>
        <h5 class="text-center">FORM C: Family Information</h5>

        <form>
          <fieldset class="border p-4">
            <legend class="w-auto px-2">STUDENT INFORMATION</legend>
            <div class="col-lg-4 col-md-6 mb-4">
              <fieldset class="form-check mb-4">
                <input
                  class="form-check-input"
                  name="group1"
                  type="radio"
                  id="radio1"
                  checked="checked"
                />
                <label class="form-check-label" for="radio1">
                  Option 1
                </label>
              </fieldset>

              <fieldset class="form-check mb-4">
                <input
                  class="form-check-input"
                  name="group1"
                  type="radio"
                  id="radio2"
                />
                <label class="form-check-label" for="radio2">
                  Option 2
                </label>
              </fieldset>

              <fieldset class="form-check mb-4">
                <input
                  class="form-check-input"
                  name="group1"
                  type="radio"
                  id="radio3"
                />
                <label class="form-check-label" for="radio3">
                  Option 3
                </label>
              </fieldset>
            </div>

            <div class="mb-3">
              <label>Select One:</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="enrollment"
                  value="Re-Enrollment"
                  id="r1"
                />
                <label class="form-check-label" for="r1">
                  Re-Enrollment
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="enrollment"
                  value="New Student"
                  id="r2"
                />
                <label class="form-check-label" for="r2">
                  New Student
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="enrollment"
                  value="Returning Student"
                  id="r3"
                />
                <label class="form-check-label" for="r3">
                  Returning Student
                </label>
              </div>
            </div>

            <div class="mb-3">
              <label>Select One:</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="enrollment"
                  value="Re-Enrollment"
                />
                <label class="form-check-label">Re-Enrollment</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="enrollment"
                  value="New Student"
                />
                <label class="form-check-label">New Student</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="enrollment"
                  value="Returning Student"
                />
                <label class="form-check-label">Returning Student</label>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-4">
                <label>School Year</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4">
                <label>Grade Level</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4">
                <label>Gender</label>
                <select class="form-select">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label>Primary Teacher</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="primaryTeacher"
                    value="Mother"
                    id="c1"
                  />
                  <label class="form-check-label" for="c1">
                    Mother
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="primaryTeacher"
                    value="Father"
                  />
                  <label class="form-check-label">Father</label>
                </div>
              </div>
              <div class="col-md-6">
                <label>Graduation Participation</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="graduation"
                    value="Kindergarten"
                    id="c3"
                  />
                  <label class="form-check-label" for="c3">
                    Kindergarten Ceremony
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="graduation"
                    value="8th Grade"
                  />
                  <label class="form-check-label">8th Grade Ceremony</label>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset class="border p-4 mt-4">
            <legend class="w-auto px-2">MOTHER/GUARDIAN INFORMATION</legend>

            <div class="row mb-3">
              <div class="col-md-4">
                <label>Name</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4">
                <label>Phone</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4">
                <label>Email</label>
                <input type="email" class="form-control" />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label>Mailing Address</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label>Educational Level</label>
                <select class="form-select">
                  <option value="GED">GED</option>
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="College Degree">College Degree</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset class="border p-4 mt-4">
            <legend class="w-auto px-2">FATHER/GUARDIAN INFORMATION</legend>

            <div class="row mb-3">
              <div class="col-md-4">
                <label>Name</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4">
                <label>Phone</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-4">
                <label>Email</label>
                <input type="email" class="form-control" />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label>Mailing Address</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label>Educational Level</label>
                <select class="form-select">
                  <option value="GED">GED</option>
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="College Degree">College Degree</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset class="border p-4 mt-4">
            <legend class="w-auto px-2">CHURCH INFORMATION</legend>

            <div class="mb-3">
              <label>Does student attend church regularly?</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="churchAttendance"
                  value="Yes"
                />
                <label class="form-check-label">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="churchAttendance"
                  value="No"
                />
                <label class="form-check-label">No</label>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label>Name of Church</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label>Pastor's Name</label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </fieldset>

          <div class="border p-4 mt-4">
            <div class="row">
              <div class="col-md-6">
                <label>Parent/Guardian Signature:</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label>Date:</label>
                <input type="date" class="form-control" />
              </div>
            </div>
          </div>

          <div class="mt-4 text-center">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
