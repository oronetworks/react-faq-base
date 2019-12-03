# React FAQ Base

This is a base chat library for FAQ bots.

## Installation

Make sure you have the access rights to this repository

```bash
yarn add https://github.com/oronetworks/react-faq-base.git
```

## Usage

Add component and pass props as listed below.

```jsx
import React, { Component } from "react";

import Chat from "react-faq-base";

class Example extends Component {
  render() {
    return (
      <Chat
        base_url="http://my-backend-url"
        initial_messages="['Hi, I am FAQ bot','Powered by AI']"
        bot_name="Bot Foo"
        primary_color="#fff"
      />
    );
  }
}
```

## Props

Property | description | Type
--- | --- | --- |
base_url | URL to the backend | http
initial_messages | Welcome messages to greet the user | Array
bot_name | Name of the bot displayed in the chat header | String
primary_color ( optional ) | Primary color for the chat window | Hex
bot_src ( optional ) | Bot icon displayed in chat header and below bot's messages | http
bot_inverted ( optional ) | Bot icon displayed inside toggle button | http

## License

[MIT](https://choosealicense.com/licenses/mit/)

