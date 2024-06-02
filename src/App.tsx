import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import PeoplePage from "./pages/PeoplePage";
import "../src/assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div id="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </div>
  );
};

export default App;