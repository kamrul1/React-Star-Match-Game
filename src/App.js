import React, { useState } from "react";
import "./styles.css";

import { PlayNumber } from "./PlayNumber";
import { StarsDisplay } from "./StarsDisplay";
import { utils } from "./Utils";

export default function App() {
  return <StarMatch />;
}

// STAR MATCH - Starting Template

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailbleNumbers] = useState(utils.range(1, 9));
  const [condidateNumbers, setCandidateNumbers] = useState([]);

  const candidatesAreWrong = utils.sum(condidateNumbers) > stars;

  const numberStatus = number => {
    if (!availableNumbers.includes(number)) {
      return "used";
    }
    if (condidateNumbers.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "avaiable";
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === "used") {
      return;
    }
    //this part is not working:
    // const newCandidateNumbers =
    //   currentStatus === 'available'
    //   ? condidateNumbers.concat(number)
    //   : condidateNumbers.filter(cn=>cn !==number);

    //instead: this is the old code which partly works
    const newCandidateNumbers = condidateNumbers.concat(number);

    if (utils.sum(newCandidateNumbers) !== stars) {
      setCandidateNumbers(newCandidateNumbers);
    } else {
      const newAvailableNumbers = availableNumbers.filter(
        n => !newCandidateNumbers.includes(n)
      );
      //redraw starts
      setStars(utils.randomSumIn(newAvailableNumbers, 9));

      //reset values
      setAvailbleNumbers(newAvailableNumbers);
      setCandidateNumbers([]);
    }
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};
