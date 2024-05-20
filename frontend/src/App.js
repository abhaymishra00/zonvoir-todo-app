import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import { Provider } from "react-redux";
import store from "./store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/new" element={<NewTask />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
