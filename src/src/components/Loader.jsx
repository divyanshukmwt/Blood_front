import React, { useEffect, useState, useRef } from "react";

const TIMER = 150;
const TRANSITION = 0.5;
const DEF_SIZE = 60;
const GUTTER = 5;

const initialPositions = {
  1: "alpha",
  2: "bravo",
  3: "charlie",
  4: null,
  5: "delta",
  6: "echo",
  7: "foxtrot",
};

const Loader = ({ size = DEF_SIZE, style = {}, center = true }) => {
  const [positions, setPositions] = useState(initialPositions);
  const [stateNumber, setStateNumber] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(setNextState, TIMER);
    return () => clearInterval(timerRef.current);
  }, [positions, stateNumber]);

  const tileIndexToMove = () => {
    return [7, 6, 5, 4, 3, 2, 1, 4][stateNumber];
  };

  const positionForTile = (tileName) => {
    return Object.keys(positions).find((key) => positions[key] === tileName);
  };

  const setNextState = () => {
    const emptyIndex = positionForTile(null);
    const indexToMove = tileIndexToMove();

    const newPositions = {
      ...positions,
      [indexToMove]: null,
      [emptyIndex]: positions[indexToMove],
    };

    const nextState = stateNumber === 7 ? 0 : stateNumber + 1;
    setPositions(newPositions);
    setStateNumber(nextState);
  };

  const clipPathForPosition = (position) => {
    position = parseInt(position, 10);
    const SIZE = (100 - 2 * GUTTER) / 3;
    const VAR0 = "0% ";
    const VAR1 = SIZE + GUTTER + "% ";
    const VAR2 = 2 * SIZE + 2 * GUTTER + "% ";

    switch (position) {
      case 1:
        return `inset(${VAR1}${VAR2}${VAR1}${VAR0} round 5%)`;
      case 2:
        return `inset(${VAR0}${VAR2}${VAR2}${VAR0} round 5%)`;
      case 3:
        return `inset(${VAR0}${VAR1}${VAR2}${VAR1} round 5%)`;
      case 4:
        return `inset(${VAR1}${VAR1}${VAR1}${VAR1} round 5%)`;
      case 5:
        return `inset(${VAR2}${VAR1}${VAR0}${VAR1} round 5%)`;
      case 6:
        return `inset(${VAR2}${VAR0}${VAR0}${VAR2} round 5%)`;
      case 7:
        return `inset(${VAR1}${VAR0}${VAR1}${VAR2} round 5%)`;
      default:
        return "";
    }
  };

  const renderTiles = () => {
    return ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"].map(
      (tile) => {
        const pos = positionForTile(tile);
        const style = {
          transition: `${TRANSITION}s cubic-bezier(0.86, 0, 0.07, 1)`,
          WebkitClipPath: clipPathForPosition(pos),
        };

        return <div key={tile} style={style} className={`rect ${tile}`} />;
      }
    );
  };

  const wrapperStyle = {
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  };

  return (
    <div
      className={`sw-loader__wrapper${
        center ? " sw-loader__wrapper--center" : ""
      }`}
      style={wrapperStyle}>
      <div className="sw-loader__holder">{renderTiles()}</div>
    </div>
  );
};

export default Loader;
