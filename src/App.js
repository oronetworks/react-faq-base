import React from "react";
import axios from "axios";
import ChatBody from "./components/ChatBody";
import ChatHeader from "./components/ChatHeader";
import ChatFooter from "./components/ChatFooter";
import Toggle from "./components/Toggle";
import { generateId, getLocaltime } from "./helper";
import { Provider } from "./context";
import * as constants from "./constants";
import "./scss/widget.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      count: 0
    };
    this.params = {
      ...constants,
      ...props
    };
    this.windowTrigger = this.windowTrigger.bind(this);
  }

  componentDidMount() {
    this.setSession();
    this.initialMessagePopulate();
  }

  setSession() {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = generateId();
      localStorage.setItem("sessionId", sessionId);
    }

    this.setState({ sessionId });
  }

  initialMessagePopulate() {
    const pattern = /^\[(.+)\]$/gm;
    const messages = this.params.initial_messages;
    const initialData = messages.map(message => {
      let match = pattern.exec(message);
      if (match) {
        return {
          message: match[1].split(",").map(item => item.trim()),
          id: generateId(),
          author: 0
        };
      }
      return { message, id: generateId(), author: 0 };
    });

    this.setState({
      data: initialData,
      count: this.state.open ? 0 : this.state.count + initialData.length
    });
  }

  //handle options input
  replaceWithAnswer = (option, id) => {
    let uniqueId = generateId();
    let { data, sessionId } = this.state;
    let index = this.state.data.findIndex(obj => obj.id == id);
    data[index].visible = false;
    data.push({
      id: uniqueId,
      author: 1,
      message: option,
      sending: true
    });
    this.setState(
      { data, count: this.state.open ? 0 : this.state.count + 1 },
      () => {
        let { data } = this.state;
        let index = data.findIndex(obj => obj.id == uniqueId);

        let bodyFormData = new FormData();
        bodyFormData.set("qs", option);
        bodyFormData.set("sender", sessionId);
        bodyFormData.set("current_time", getLocaltime());

        axios
          .post(`${this.params.base_url}`, bodyFormData, {
            "Content-Type": "multipart/form-data"
          })
          .then(response => {
            let apiResponse = response.data;
            data[index].sending = false;
            apiResponse.forEach(({ text }) => {
              data.push({ message: text, author: 0, id: generateId() });
            });
            this.setState({
              data,
              count: this.state.open ? 0 : this.state.count + apiResponse.length
            });
          })
          .catch(error => {
            data[index].error = true;
            data[index].sending = false;
            this.setState({ data });
          });
      }
    );
  };

  //text input
  handleTextInput = input => {
    let randomId = generateId();
    let { data, sessionId } = this.state;
    let dataLength = data.length;
    let top = dataLength - 1;
    if (data[top].message && Array.isArray(data[top].message)) {
      data[top].visible = false;
    }
    data.push({
      id: randomId,
      author: 1,
      message: input,
      sending: true
    });
    this.setState(
      { data, count: this.state.open ? 0 : this.state.count + 1 },
      () => {
        let index = this.state.data.findIndex(obj => obj.id == randomId);
        let { data } = this.state;
        let bodyFormData = new FormData();
        bodyFormData.set("qs", input);
        bodyFormData.set("sender", sessionId);
        bodyFormData.set("current_time", getLocaltime());

        axios
          .post(`${this.params.base_url}`, bodyFormData, {
            "Content-Type": "multipart/form-data"
          })
          .then(response => {
            let apiResponse = response.data;
            data[index].sending = false;
            apiResponse.forEach(({ text }) => {
              data.push({ message: text, author: 0, id: generateId() });
            });
            this.setState({
              data,
              count: this.state.open ? 0 : this.state.count + apiResponse.length
            });
          })
          .catch(error => {
            data[index].error = true;
            data[index].sending = false;
            this.setState({ data });
          });
      }
    );
  };

  windowTrigger = () => {
    let { open } = this.state;
    if (!open) {
      this.setState({ open: !open, count: 0 });
    } else {
      this.setState({ open: !open });
    }
  };

  render() {
    let { open, data, count } = this.state;

    return data.length > 0 ? (
      <Provider
        value={{
          ...this.params,
          replaceWithAnswer: this.replaceWithAnswer,
          windowTrigger: this.windowTrigger
        }}
      >
        <div id="piri-ai">
          <div
            className="window"
            style={{
              right: open ? 0 : -350,
              display: open ? "flex" : "none"
            }}
          >
            <ChatHeader />
            <ChatBody data={{ data }} />
            <ChatFooter handleTextInput={this.handleTextInput} />
          </div>
          {!open && <Toggle data={{ count }} />}
        </div>
      </Provider>
    ) : null;
  }
}

export default App;
