import axios from "axios";
let baseCurrency: string;

const apiData = axios.get(
  "https://v6.exchangerate-api.com/v6/fc99e326b5de7c94f177da5f/latest/pkr"
);
apiData
  .then(function (response) {
    // handle success
    baseCurrency = response.data["base_code"];
    console.log(baseCurrency);

    console.log(response.data["conversion_rates"]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
