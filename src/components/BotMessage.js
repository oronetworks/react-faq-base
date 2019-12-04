import React from "react";
import { Consumer } from "../context";
import Styled from "styled-components";

export default props => {
  let { item, next, prev, nextOptions } = props.data;
  let dec = next != 0 || (next == 0 && nextOptions);
  return (
    <Consumer>
      {({ bot_name, bot_src, primary_color }) => (
        <React.Fragment>
          {(next != 0 || (next == 0 && nextOptions)) && (
            <img src={bot_src} style={{ width: 25 }} />
          )}
          <div
            style={{
              flexDirection: "column",
              borderRadius: 10,
              marginLeft: next == 0 && !nextOptions ? 35 : 10
            }}
          >
            {prev && (
              <p style={{ fontSize: 12, marginBottom: 5, color: "#424242" }}>
                {bot_name}
              </p>
            )}
            <Message
              className={dec ? "message tail" : "message"}
              style={{
                borderBottomLeftRadius: dec ? 0 : 10,
                marginBottom: dec ? 20 : 0,
                backgroundColor: primary_color
              }}
              primary_color={primary_color}
            >
              {item.message}
            </Message>
          </div>
        </React.Fragment>
      )}
    </Consumer>
  );
};

const Message = Styled.p`
&:before{
  border-color: ${props =>
    props.primary_color} transparent transparent ${props =>
  props.primary_color} !important;
  }
`;
