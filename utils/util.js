export const getDay = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
};

export const request = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log("----data----", data);
  return data;
};

export const getCity = () => {
  if ("geolocation" in navigator) {
    /* 地理位置服务可用 */
    console.log("----geolocation----");
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("----position----", position);
    });
  } else {
    /* 地理位置服务不可用 */
  }
};
