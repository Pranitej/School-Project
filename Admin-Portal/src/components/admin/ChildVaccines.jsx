import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ChildVaccines({ childId }) {
  const [shot, setShot] = useState("");
  const [shotsReceived, setShotsReceived] = useState(0);
  const [shotsRequired, setShotsRequired] = useState(0);
  const [shot1, setShot1] = useState("");
  const [shot2, setShot2] = useState("");
  const [shot3, setShot3] = useState("");
  const [shot4, setShot4] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [shotNotes, setShotNotes] = useState("");
  const [previousShotRecord, setPreviousShotRecord] = useState(null);
  const [shotId, setShotId] = useState(null);

  const getPreviousShotData = () => {
    resetPreviousData();
    shot &&
      axios
        .get(
          `http://localhost:8091/api/childvaccines/child/${childId}/vaccine/${shot}`
        )
        .then((response) => {
          if (response.data) {
            setPreviousShotRecord(response.data);
            response.data.shotId && setShotId(response.data.shotId);
          } else {
            setPreviousShotRecord(null);
          }
        })
        .catch((error) => console.error(error));
  };

  const handleUpdateShot = () => {
    axios
      .post(`http://localhost:8091/api/childvaccines/createChildVaccine`, {
        shotId: shotId ? shotId : null,
        childId,
        vaccineName: shot,
        totalShots: shotsRequired,
        shotsReceived,
        shotDate1: shot1,
        shotDate2: shot2,
        shotDate3: shot3,
        shotDate4: shot4,
        nextShotDueDate: dueDate,
        shotNotes,
      })
      .then((response) => {
        if (response.data) {
          alert("Shot Updated...");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const resetPreviousData = () => {
    setShotsReceived(0);
    setShotsRequired(0);
    setShot1("");
    setShot2("");
    setShot3("");
    setShot4("");
    setDueDate("");
    setShotNotes("");
    setPreviousShotRecord(null);
    setShotId(null);
  };

  useEffect(() => {
    previousShotRecord && setShot(previousShotRecord.vaccineName);
    previousShotRecord && setShotsRequired(previousShotRecord.totalShots);
    previousShotRecord && setShotsReceived(previousShotRecord.shotsReceived);
    previousShotRecord && previousShotRecord.shotDate1
      ? setShot1(previousShotRecord.shotDate1)
      : setShot1("");
    previousShotRecord && previousShotRecord.shotDate2
      ? setShot2(previousShotRecord.shotDate2)
      : setShot2("");
    previousShotRecord && previousShotRecord.shotDate3
      ? setShot3(previousShotRecord.shotDate3)
      : setShot3("");
    previousShotRecord && previousShotRecord.shotDate4
      ? setShot4(previousShotRecord.shotDate4)
      : setShot4("");
    previousShotRecord && previousShotRecord.nextShotDueDate
      ? setDueDate(previousShotRecord.nextShotDueDate)
      : setDueDate("");
    previousShotRecord && previousShotRecord.shotNotes
      ? setShotNotes(previousShotRecord.shotNotes)
      : setShotNotes("");
  }, [previousShotRecord]);

  useEffect(() => getPreviousShotData(), [childId, shot]);

  return (
    <div>
      <div
        className="modal fade"
        id="childVaccines"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-notify modal-info"
          role="document"
        >
          {/* Content */}
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <p className="heading lead">Shots Records</p>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" className="white-text">
                  &times;
                </span>
              </button>
            </div>

            <form className="form-floating">
              {/* Body */}
              <div className="modal-body">
                <div className="mt-0 row">
                  <div className="col-sm-6">
                    <label for="className">Shots:</label>
                    <select
                      className="form-control"
                      id="shots"
                      value={shot}
                      onChange={(e) => setShot(e.target.value)}
                      style={{ height: "35px" }}
                    >
                      <option value={""}>-- Select Shot --</option>
                      <option value="DTaP (Diphtheria, Tetanus, Pertussis)">
                        DTaP (Diphtheria, Tetanus, Pertussis)
                      </option>
                      <option value="HepA">HepA</option>
                      <option value="Hepatitis B">Hepatitis B</option>
                      <option value="Hib (Haemophilus Influenza Type B)">
                        Hib (Haemophilus Influenza Type B)
                      </option>
                      <option value="IPV (Inactivated Poliovirus)-Polio">
                        IPV (Inactivated Poliovirus)-Polio
                      </option>
                      <option value="MMR (Measles, Mumps, Rubella)">
                        MMR (Measles, Mumps, Rubella)
                      </option>
                      <option value="PCV (Pneumococcal)-Prevnar">
                        PCV (Pneumococcal)-Prevnar
                      </option>
                      <option value="Physical">Physical</option>
                      <option value="Varicella">Varicella</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label for="dueDate">Due Date:</label>
                      <input
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        type="date"
                        id="dueDate"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row mt-0">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label for="shotsRequired">Shots Required:</label>
                        <input
                          type="text"
                          id="shotsRequired"
                          value={shotsRequired}
                          className="form-control"
                          onChange={(e) => setShotsRequired(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label for="shotsReceived">Shots Received:</label>
                        <input
                          type="text"
                          id="shotsReceived"
                          value={shotsReceived}
                          onChange={(e) => setShotsReceived(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label for="shot1">Shot - 1:</label>
                        <input
                          value={shot1}
                          onChange={(e) => setShot1(e.target.value)}
                          type="date"
                          id="shot1"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label for="shot2">Shot - 2:</label>
                        <input
                          value={shot2}
                          onChange={(e) => setShot2(e.target.value)}
                          type="date"
                          id="shot2"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label for="shot3">Shot - 3:</label>
                        <input
                          value={shot3}
                          onChange={(e) => setShot3(e.target.value)}
                          type="date"
                          id="shot3"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label for="shot4">Shot - 4:</label>
                        <input
                          value={shot4}
                          onChange={(e) => setShot4(e.target.value)}
                          type="date"
                          id="shot4"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="shotNotes">Shot Notes:</label>
                        <textarea
                          id="shotNotes"
                          className="form-control"
                          value={shotNotes}
                          onChange={(e) => setShotNotes(e.target.value)}
                          rows="2"
                          style={{ width: "100%" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-info btn-sm"
                  data-dismiss="modal"
                  onClick={() => handleUpdateShot()}
                >
                  Update Shot Record <i className="far fa-gem ml-1"></i>
                </button>
                <a
                  type="button"
                  className="btn btn-outline-danger btn-sm waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
          {/* Content */}
        </div>

        {/* Central Modal Large Info */}
      </div>
    </div>
  );
}
