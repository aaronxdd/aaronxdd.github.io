export const getDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
}

export const request = async(url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export const getCity = () => {
  if ("geolocation" in navigator) {
    console.log('====geolocation===', geolocation);
    /* 地理位置服务可用 */
  } else {
    /* 地理位置服务不可用 */
  }
}
