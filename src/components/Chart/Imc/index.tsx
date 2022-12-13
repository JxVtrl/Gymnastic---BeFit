import React from "react";
import GaugeChart from "react-gauge-chart";
import { Text } from "@chakra-ui/react";
// import { Container } from './styles';
import { calculatePercentageImc } from "../../../helpers/calculateImc";

interface iImc {
  height: string | number | undefined;
  weight: string | number | undefined;
}
export const Imc: React.FC<iImc> = ({ height, weight }) => {
  return (
    <GaugeChart
      colors={["#FF5F6D", "#f3ff48", "#73ff71"]}
      arcWidth={0.3}
      nrOfLevels={10}
      percent={calculatePercentageImc(Number(height), Number(weight))}
      hideText={false}
      cornerRadius={1}
      textColor="#9f9f9f"
      needleColor=""
    />
  );
};
