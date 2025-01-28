import React, { useState } from "react";

export default function AdminActionsList({
  currentAction,
  setCurrentAction,
  actionList,
}) {
  const [search, setSearch] = useState("");

  const filteredActions = actionList.filter((action) =>
    action.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="">
        <input
          type="search"
          className="form-control form-control-sm mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div
        className="row mt-2 card border m-0"
        style={{ background: "#e8e8e8" }}
      >
        {filteredActions &&
          filteredActions.map((item, index) => (
            <div key={index}>
              <div
                className="col-sm-12 p-1 pl-2 b-1 text-left"
                style={
                  currentAction === item.name
                    ? { cursor: "pointer", background: "lightGreen" }
                    : { cursor: "pointer" }
                }
                onClick={() =>
                  item.name === currentAction
                    ? setCurrentAction("")
                    : setCurrentAction(item.name)
                }
              >
                <p className="m-0" style={{ fontSize: "14px" }}>
                  {item.name}
                </p>
              </div>
              <hr className="m-0" />
            </div>
          ))}
      </div>
    </>
  );
}
