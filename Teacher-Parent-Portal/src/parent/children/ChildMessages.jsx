import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChildMessages() {
  const { id } = useParams();
  const [currentChild, setCurrentChild] = useState(null);
  const [search, setSearch] = useState("");
  const [messageText, setMessageText] = useState("");
  const [file, setFile] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState(null);

  const divStyle = {
    backgroundImage: "url('/images/chatBackgroundImage.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "420px",
    overflowY: "auto",
    overflowX: "hidden",
  };

  const getAllMessages = () => {
    axios
      .get(`http://localhost:8091/api/messages/getMessagesByChildId/${id}`)
      .then((response) => {
        if (response.data) {
          setAllMessages(response.data.reverse());
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const getChildByChildId = () => {
    axios
      .get(`http://localhost:8091/api/children/getChildById/${id}`)
      .then((response) => {
        if (response.data) {
          setCurrentChild(response.data);
        } else {
          alert("Something went wrong...0");
        }
      })
      .catch((error) => console.error(error));
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const uploadFile = (fileName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("n", 10);
    formData.append("filename", fileName);
    axios
      .post(`http://localhost:8091/api/files/upload`, formData)
      .then((response) => {
        if (response.data) {
          setFile(null);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSendMessage = () => {
    if (messageText || file) {
      const fileName = file ? Date.now() + file.name : null;
      axios
        .post(`http://localhost:8091/api/messages/createMessage`, {
          messageDate: new Date().toISOString().slice(0, 10),
          messageTime: getCurrentTime(),
          messageText,
          childId: currentChild.id,
          guardianId: null,
          guardianName: null,
          employeeId: null,
          employeeName: null,
          adminId: 1,
          messageFrom: "guardian",
          attachmentFile: fileName,
        })
        .then((response) => {
          if (response.data) {
            uploadFile(fileName);
            setMessageText("");
            getAllMessages();
          } else {
            alert("Something went wrong...");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Invalid inputs...");
    }
  };

  const handleMessageDelete = (id) => {
    axios
      .delete(`http://localhost:8091/api/messages/deleteMessage/${id}`)
      .then((response) => {
        if (response) {
          getAllMessages();
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllMessages();
  }, [currentChild, id]);

  useEffect(() => {
    if (allMessages) {
      setFilteredMessages(
        allMessages.filter((message) =>
          message.messageText.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, allMessages]);

  useEffect(() => getChildByChildId(), [id]);

  return currentChild ? (
    <div className="container mt-3 mb-5">
      <div className="row mb-3">
        <div className="col-sm-12 text-center">
          <h3>
            <b className="text-primary">Messages</b>
          </h3>
        </div>
      </div>
      <div className="card m-0 p-2">
        <div className="row">
          <div className="col-sm-9">
            <img
              className="img-fluid rounded-circle mt-0"
              src={`http://localhost:8091/images/childrens/${currentChild.childPic}`}
              style={{ width: "30px", height: "30px", display: "inline" }}
            />
            <label className="ml-1 mb-0">
              <h5 className="mb-0 mt-1 ml-3">
                <b className="text-dark">{`${currentChild.firstName} ${currentChild.lastName} (${currentChild.nickName})`}</b>
              </h5>
            </label>
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card mt-3 p-2 " style={divStyle}>
        {filteredMessages && filteredMessages.length !== 0 ? (
          <div className="">
            {filteredMessages.map((item, index) => (
              <div className="row" key={index}>
                {item.messageFrom === "guardian" ? (
                  <>
                    <div className="col-sm-4 m-0 p-0"></div>
                    <div className="col-sm-8">
                      <div className="card m-2 p-2 bg-white">
                        <div className="row">
                          <div className="col-sm-10 ">
                            <h6 className="mt-1 ml-2">
                              <b className="text-success">You</b>
                            </h6>
                          </div>
                          <div className="col-sm-2 text-right p-1 pr-4">
                            <i
                              className="fas fa-trash fa-1x text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleMessageDelete(item.messageId)
                              }
                            ></i>
                          </div>
                        </div>
                        <div className="row">
                          {item.messageText && (
                            <div className="col-sm-12">
                              <div className="card p-2 m-0 text-dark">
                                <pre className="small mb-0">
                                  {item.messageText}
                                </pre>
                              </div>
                            </div>
                          )}
                          {item.attachmentFile && (
                            <div className="col-sm-12">
                              <div className="mt-0">
                                <a
                                  href={`http://localhost:8091/images/childMessageAttachments/${item.attachmentFile}`}
                                  target="_blank"
                                  download
                                  className="small card p-2 mt-2"
                                >
                                  File: {item.attachmentFile}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="row mt-2 mr-2">
                          <div className="col-sm-12 text-right">
                            <small className="text-info">{`${item.messageDate}, ${item.messageTime}`}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-sm-8">
                      <div className="card bg-white m-2 p-2">
                        <div className="row">
                          <div className="col-sm-10 ">
                            <h6 className="mt-1 ml-2">
                              <b className="text-danger">Admin</b>
                            </h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            {item.messageText && (
                              <div className="card p-2 text-dark m-0">
                                <pre className="small mb-0">
                                  {item.messageText}
                                </pre>
                              </div>
                            )}
                            {item.attachmentFile && (
                              <div className="mt-0">
                                <a
                                  href={`http://localhost:8091/images/childMessageAttachments/${item.attachmentFile}`}
                                  target="_blank"
                                  download
                                  className="small card p-2 mt-2"
                                >
                                  File: {item.attachmentFile}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row mt-2 mr-2">
                          <div className="col-sm-12 text-right">
                            <small className="text-info">{`${item.messageDate}, ${item.messageTime}`}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 m-0 p-0"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h5 className="text-danger m-3">No conversation found...</h5>
        )}
      </div>

      <div className="card mt-3 mb-5">
        <div className="row p-2">
          <div className="col-sm-8">
            <textarea
              rows="3"
              className="form-control form-control-sm"
              placeholder="Message"
              style={{ width: "100%" }}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>
          </div>
          <div className="col-sm-4">
            <button
              className="btn btn-sm btn-outline-success m-0 "
              onClick={() => handleSendMessage()}
            >
              Send
            </button>
            <button
              className="btn btn-sm btn-outline-danger m-0 ml-2"
              onClick={() => handleSendMessage()}
            >
              Print
            </button>
            <button
              className="btn btn-sm btn-outline-brown m-0 ml-2"
              onClick={() => getAllMessages()}
            >
              Refresh
            </button>
            <br />
            <input
              type="file"
              value={file ? file.fileName : ""}
              className="btn btn-sm btn-outline-primary pt-1 pb-1 m-0 mt-2"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h4 className="text-danger">Something went wrong...</h4>
  );
}
