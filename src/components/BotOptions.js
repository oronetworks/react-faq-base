import React, { useState } from "react";
import { Consumer } from "../context";

const Pill = props => {
  const [hovered, toggleHover] = useState(false);
  let { data } = props;
  let { option, id } = data;
  return (
    <Consumer>
      {({ primary_color, replaceWithAnswer }) => (
        <a
          href="#"
          className="pill"
          style={{
            backgroundColor: hovered ? primary_color : "#fff",
            color: hovered ? "#fff" : primary_color,
            border: `1px solid ${primary_color}`
          }}
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
          onClick={e => {
            e.preventDefault();
            replaceWithAnswer(option, id);
          }}
        >
          {option}
        </a>
      )}
    </Consumer>
  );
};

export default props => {
  let { item } = props.data;

  return (
    <React.Fragment>
      <div className="optionsWrapper">
        {item.message.map(option => (
          <Pill data={{ option, id: item.id }} />
        ))}
      </div>
    </React.Fragment>
  );
};
