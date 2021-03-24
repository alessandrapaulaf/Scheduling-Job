import styled from "styled-components";

export const Container = styled.div`
  height: 120px;
  width: 120px;

  .circular-chart {
    display: block;
    max-height: 250px;
  }

  .circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 1.8;
  }

  .circle {
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }

  .percentage {
    font-family: sans-serif;
    font-size: 0.5em;
    text-anchor: middle;
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
`;
