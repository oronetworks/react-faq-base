import React, {useState, useEffect} from "react";
import {Consumer} from "../context";
import '../assets/toggle.scss'
export default props => {
  let {data} = props;
  let count = data.count;
  let jumpTillSec = 10000;
  let startJumpInSec = 15000;
  let highestTimeoutId = setTimeout(";");
  const [isAnimate, setIsAnimate] = useState(true)

  useEffect(() => {
    jumpTillSec = 15000;
    startJumpInSec = 15000;
    if (count > 0) {
      setIsAnimate(true);
    }
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    startJump();
  }, [count]);

  let startJump = () => {
    if (count === 0) {
      return;
    }
    setTimeout(() => {
      setIsAnimate(false);
      setTimeout(() => {
        setIsAnimate(true);
        startJumpInSec *= 2;
        startJump();
      }, startJumpInSec);
    }, jumpTillSec)
  }

  return (
    <Consumer>
      {({primary_color, bot_inverted, windowTrigger}) => (
        <div
          className={`${count > 0 && isAnimate ? 'box bounce-1 toggle' : 'toggle'}`}
          onClick={windowTrigger}
          style={{backgroundColor: primary_color}}
        >
          <img src={bot_inverted} width={33} height={33}/>
          {!!count && (
            <p
              className="count"
              style={{
                color: primary_color,
                fontWeight: "bold"
              }}
            >
              {count}
            </p>
          )}
        </div>
      )}
    </Consumer>
  );
};
