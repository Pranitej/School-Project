import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { data } from "../../App";

export default function ChildTop10Messages() {
  const [messages, setMessages] = useState([]);
  const { parentData } = useContext(data);

  const getTop10Messages = () => {
    axios
      .get(
        `http://localhost:8091/api/messages/last10/${parentData.checkInCode}`
      )
      .then((response) => {
        if (response.data) {
          setMessages(response.data);
        } else {
          alert("Something went wrong...");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => getTop10Messages(), [parentData]);

  return (
    <>
      <small className="text-danger">Latest Messages *</small>
      <div className="row m-0">
        {messages.map((item, index) => (
          <div className="col-sm-6" key={index}>
            <div className="card p-2">
              {item.messageText}
              <hr className="m-2" />
              <div className="text-right">
                <small>{`${item.messageTime}, ${item.messageDate}`}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
