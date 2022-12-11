import React from "react";
import GaugeChart from "react-gauge-chart";

export function Effectivity() {
  return (
    <GaugeChart
      colors={["#FF5F6D", "#FFC371", "#73ff71"]}
      arcWidth={0.3}
      arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]}
      nrOfLevels={5}
      percent={0.86}
      hideText={false}
      cornerRadius={1}
      textColor='#9f9f9f'
      needleColor=""
    />
  );
}
