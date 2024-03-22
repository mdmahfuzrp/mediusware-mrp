import React, { useState } from "react";

const Problem1 = () => {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskName.trim() === "" || newTaskStatus.trim() === "") return; // Prevent adding empty tasks
    setTasks([...tasks, { name: newTaskName, status: newTaskStatus }]);
    setNewTaskName("");
    setNewTaskStatus("");
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = () => {
    let filtered = [...tasks];
    if (filter !== "all") {
      filtered = filtered.filter((task) => task.status === filter);
    }
    // Sort tasks so that "active" status tasks appear first, then "completed", and then others
    filtered.sort((a, b) => {
      if (a.status === "active") return -1;
      if (b.status === "active") return 1;
      if (a.status === "completed") return -1;
      if (b.status === "completed") return 1;
      return 0;
    });
    return filtered;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "all" && "active"}`}
                type="button"
                onClick={() => handleFilterChange("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "active" && "active"}`}
                type="button"
                onClick={() => handleFilterChange("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${filter === "completed" && "active"}`}
                type="button"
                onClick={() => handleFilterChange("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
