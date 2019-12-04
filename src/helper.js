export const generateId = () => {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const getLocaltime = () => {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)
    .split(".")
    .shift();
  return localISOTime;
};

export const replaceUrl = text => {
  let Parser = require("html-to-react").Parser;
  let htmlToReact = new Parser();
  let pattern = /(https?:\/\/[^\s]+)/;
  let matched = text.match(pattern);
  if (matched) {
    text = `<span>${text}</span>`;
    console.log(
      htmlToReact.parse(
        text.replace(
          matched[0],
          `<a href="${matched[0]}" target="_blank" style="color:#fff; text-decoration:underline; outline:none">${matched[0]}</a>`
        ),
        "tets"
      )
    );
    return htmlToReact.parse(
      text.replace(
        matched[0],
        `<a href="${matched[0]}" target="_blank" style="color:#fff; text-decoration:underline; outline:none">${matched[0]}</a>`
      )
    );
  }
  return text;
};

export const urlMatch = (urls = []) => {
  let flag = false;
  urls.forEach(element => {
    if (window.location.pathname == element) {
      flag = true;
    }
  });
  return flag;
};
