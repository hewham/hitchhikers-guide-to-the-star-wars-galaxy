export default function httpWeatherCall(url) {
  return new Promise((resolve) => {
    fetch(url, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        resolve(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
  });
}