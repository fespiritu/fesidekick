import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080/api';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

/*
const params = {
            instrument,
            granularity
        };
*/

// function assignGranularitySort(granularity) {
//   switch(granularity) {
//     case "M30": return 1;
//     case "H1": return 2;
//     case "H4": return 3;
//     case "D": return 4;
//     default:
//       return 10;
//   }
// }
export default function getApiTableList(callback) {
   
    let url = `/accessmodel/tablelist`;
  
    axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      callback(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

export function getTableData(params, callback) {
   
  let url = `/accessmodel`;
console.log('parseTableData params: ', params);
  axios.get(url, {
    params: params
  })
  .then(function (response) {
    // handle success
    console.log(response);
    callback(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}