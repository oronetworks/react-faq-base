import React from "react";
import { Consumer } from "../context";

export default props => {
  let { data } = props;
  let count = data.count;
  return (
    <Consumer>
      {({ primary_color, bot_inverted, windowTrigger }) => (
        <div
          className="toggle"
          onClick={windowTrigger}
          style={{ backgroundColor: primary_color }}
        >
          <img src={bot_inverted} width={33} height={33} />
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
