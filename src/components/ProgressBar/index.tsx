import React from "react";
import { Container } from "./styles";

interface ProgressBarProps {
  color: string;
  percentual: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ color, percentual }) => {
  return (
    <Container>
      <div>
        <svg viewBox="0 0 36 36" className="circular-chart orange">
          <path
            className="circle-bg"
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${percentual}, 100`}
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{ stroke: color }}
          />
          <text style={{ fill: color }} x="18" y="20.35" className="percentage">
            {`${percentual}%`}
          </text>
        </svg>
      </div>
    </Container>
  );
};

export default ProgressBar;
