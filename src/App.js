import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [toDos, addTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    let notes = JSON.parse(localStorage.getItem("todos"));
    if (notes && notes.length > 0) {
      addTodos(notes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <div className="app container-fluid">
      <div className="hadd">
        <div className="col-12 d-flex justify-content-center">
          <div className="text-center pb-3">
            <div className="subHeading">
              <br />
              <div className="mainHeading mt-3">
                <h1 align="center ">ToDo List</h1>
                <h4>Whoop, it's {today()}</h4>

                <div className="input py-3">
                  <input
                    type="text"
                    placeholder="🖊️ Add item..."
                    onInput={(e) => setText(e.target.value)}
                    value={text}
                  />
                  <i
                    className="fas fa-plus"
                    onClick={() => {
                      if (text.length > 0) {
                        addTodos([
                          ...toDos,
                          {
                            value: text,
                            done: false,
                            removed: false,
                            id: Date.now(),
                            
                          },
                        ]);
                        setText("");
                      }
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="list">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h3 align="center ">Active Todos</h3>
              <div className="row">
                {toDos.map((el) => {
                  if (!el.done && !el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="active">
                          <div className="col-11">
                            <label className="small">Mark as Done:&nbsp;</label>
                            <input
                              type="checkbox"
                              name={el.id}
                              id=""
                              value={el.done}
                              onChange={() => {
                                addTodos(
                                  toDos.map((o) => {
                                    if (o.id === el.id) {
                                      o.done = !o.done;
                                    }
                                    return o;
                                  })
                                );
                              }}
                            />
                            <p
                              className="todo-content h4 my-2"
                              style={{ marginBottom: "0px" }}
                            >
                              {el.value}
                            </p>
                            <p
                              style={{
                                marginBottom: "",
                                fontSize: "0.7em",
                                color: "white",
                              }}
                            >
                              {getTime(el.id)}
                            </p>
                          </div>
                          <div className="trash">
                            <i
                              className="fas fa-trash-alt"
                              onClick={() => {
                                addTodos(
                                  toDos.map((o) => {
                                    if (o.id === el.id) {
                                      o.removed = !o.removed;
                                    }
                                    return o;
                                  })
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <h3 align="center ">Todos finished</h3>
              <div className="row">
                {toDos.map((el) => {
                  if (el.done && !el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="active">
                          <div className="col-11">
                            <label>Marked as done: &nbsp;</label>
                            <input
                              type="checkbox"
                              name="{el.id}"
                              id="{el.id}"
                              checked={el.done}
                              onChange={() => {
                                addTodos(
                                  toDos.map((o) => {
                                    if (o.id === el.id) {
                                      o.done = !o.done;
                                    }
                                    return o;
                                  })
                                );
                              }}
                            />
                            <p
                              className="todo-content h4 my-2"
                              style={{ marginBottom: "0px" }}
                            >
                              {el.value}
                            </p>
                            <p
                              style={{
                                marginBottom: "",
                                fontSize: "0.7em",
                                color: "white",
                              }}
                            >
                              {getTime(el.id)}
                            </p>
                          </div>
                          <div className="col-1">
                            <i
                              className="fas fa-times text-dark"
                              onClick={() => {
                                addTodos(
                                  toDos.filter((o) => {
                                    if (o.id === el.id) {
                                      return false;
                                    }
                                    return true;
                                  })
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <h3 align="center"> Todos cancelled</h3>
              <div className="row">
                {toDos.map((el) => {
                  if (el.removed) {
                    return (
                      <div className="todos" key={el.id}>
                        <div className="active">
                          <div className="col-11">
                            <label>Restore Todo: &nbsp;</label>
                            <input
                              type="checkbox"
                              name="{el.id}"
                              id="{el.id}"
                              value={el.done}
                              onChange={() => {
                                addTodos(
                                  toDos.map((o) => {
                                    if (o.id === el.id) {
                                      o.removed = !o.removed;
                                    }
                                    return o;
                                  })
                                );
                              }}
                            />
                            <p
                              className="todo-content h4 my-2"
                              style={{ marginBottom: "0px" }}
                            >
                              {el.value}
                            </p>
                            <p
                              style={{
                                marginBottom: "",
                                fontSize: "0.7em",
                                color: "black",
                              }}
                            >
                              {getTime(el.id)}
                            </p>
                          </div>
                          <div className="col-1">
                            <i
                              className="fas fa-times text-dark"
                              onClick={() => {
                                addTodos(
                                  toDos.filter((o) => {
                                    if (o.id === el.id) {
                                      return false;
                                    }
                                    return true;
                                  })
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function today() {
  var a = new Date();
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  var r = weekdays[a.getDay()];
  return r;
}



function getTime(time) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date(time);
  // var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  return hr + ":" + min + ampm + " " + date + " " + month + " " + year;
}
