import React from "react";
import CROSS_OUT from "../assets/cross-out.png";
import { Consumer } from "../context";

export default () => {
  return (
    <Consumer>
      {({ bot_name, bot_src, windowTrigger }) => (
        <div className="header">
          <div className="botinfo">
            <img src={bot_src} width="34" height="34" />
            <p class="botname">{bot_name}</p>
          </div>

          <a className="close" href="#" onClick={() => windowTrigger()}>
            <img src={CROSS_OUT} width="12" height="12" />
          </a>
        </div>
      )}
    </Consumer>
  );
};
