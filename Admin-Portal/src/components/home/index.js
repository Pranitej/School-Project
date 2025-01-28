import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let [htmlFileString, setHtmlFileString] = useState();

  async function fetchHtml() {
    setHtmlFileString(await (await fetch("htmlfiles/login.html")).text());
  }
  /*React runs the use effects after every render — including the first render.
  Syntax: useEffect(callback, dependencies)
  callback is a react-function
  dependencies can be a variable(s), when any of the variable value
  changes the use effect is executed. [] empty dependecies*/
  useEffect(() => {
    fetchHtml();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
      </form>
    </div>
  );
}
