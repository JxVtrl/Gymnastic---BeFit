import { Routes, Route } from "react-router-dom";
import { Home, TrainingDivision } from "../sections";


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trainingDivision" element={<TrainingDivision />} />
    </Routes>
  );
};
