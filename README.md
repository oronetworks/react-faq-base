# React FAQ Base

This is a base chat library for FAQ bots.

## Installation

```bash
yarn add react-faq-base
```

## Usage

1. Add component and pass props as listed below.

```jsx
import React, { Component } from "react";

import Chat from "react-faq-base";

class Example extends Component {
  render() {
    return (
      <Chat
        base_url="http://my-backend-url"
        initial_messages={["Hi, I am FAQ bot", "Powered by AI"]}
        bot_name="Bot Foo"
        primary_color="#fff"
      />
    );
  }
}
```

## Props

| Property         | description                                                | Type   |
| ---------------- | ---------------------------------------------------------- | ------ |
| base_url         | URL to the backend                                         | http   |
| initial_messages | Welcome messages to greet the user                         | Array  |
| bot_name         | Name of the bot displayed in the chat header               | String |
| primary_color    | Primary color for the chat window                          | Hex    |
| bot_src          | Bot icon displayed in chat header and below bot's messages | http   |
| bot_inverted     | Bot icon displayed inside toggle button                    | http   |

## License

[MIT](https://choosealicense.com/licenses/mit/)
