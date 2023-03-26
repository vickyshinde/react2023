import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Layout from "../Layout/Layout";
import UserAdd from "../users/UserAdd";
import UserListing from "../users/UserListing";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ErrorPage />} />
          <Route path="/user-listing" element={<UserListing />} />
          <Route path="/user-add" element={<UserAdd />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
