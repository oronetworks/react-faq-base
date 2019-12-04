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

export const urlMatch = (urls = []) => {
  let flag = false;
  urls.forEach(element => {
    if (window.location.pathname == element) {
      flag = true;
    }
  });
  return flag;
};
