

export default function httpWeatherCall(url) {
  return new Promise((resolve) => {



    fetch(url, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // console.log("responseJson: ",responseJson);
        resolve(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
  });
}



// export default function httpWeatherCall(url) {
//   return new Promise((resolve) => {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
//           console.log("HTTP SUCCESS: ",JSON.stringify(xmlHttp.responseText));
//           resolve({
//             error: false, 
//             response: JSON.parse(xmlHttp.responseText)
//           });

//         }else{
//           console.log("HTTP ERROR: ",JSON.stringify(xmlHttp.responseText));
//           // throw new Error(xmlHttp.responseText);
//           // resolve({error: true, errorText: xmlHttp.responseText});
//         }
//     }
//     xmlHttp.open("GET", url, true);
//     xmlHttp.send();
//   });
// }
