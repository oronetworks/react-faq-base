import React from "react";
import ERROR_SRC from "../assets/error-round.png";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorShown: false
    };
  }

  componentDidUpdate() {
    let { item } = this.props.data;
    item.error && setTimeout(() => this.setState({ errorShown: true }), 1500);
  }

  render() {
    let { item, next } = this.props.data;
    let { errorShown } = this.state;
    return (
      <div className="clientMessageWrapper">
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center"
          }}
        >
          <p
            className={!next ? "message tail" : "message"}
            style={{
              opacity: item.error ? 0.5 : 1,
              borderBottomRightRadius: !next ? 0 : 10
            }}
          >
            {item.message}
          </p>
          {errorShown && (
            <img
              src={ERROR_SRC}
              width={15}
              height={15}
              style={{ marginLeft: 5 }}
            />
          )}
        </div>
        {(item.error && !errorShown && (
          <p
            style={{ marginTop: 8, fontSize: 13, marginLeft: 1, opacity: 0.4 }}
          >
            Sending failed!
          </p>
        )) ||
          (item.sending && <p className="status">sending...</p>)}
      </div>
    );
  }
}
