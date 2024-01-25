import axios from "axios";
import inquirer from "inquirer";
class CurrencyConvertor {
  private availableCurrencies: string[] = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PKR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
  ];
  private baseCurrency: string = "pkr";
  private conversionCurrency: string = "usd";
  private apiKey: string = "fc99e326b5de7c94f177da5f";

  private getApiData(apiKey: string, apiLink: string, currencyAmount: string) {
    try {
      const apiData = axios.get(apiLink);
      apiData.then((response) => {
        console.log(this.conversionCurrency);

        // let currency =
        //   response.data["conversion_rates"][this.conversionCurrency];
        let currencyRate =
          response.data["conversion_rates"][this.conversionCurrency];
        let convertedAmount: number = parseFloat(currencyAmount) * currencyRate;

        console.log(
          `${currencyAmount} ${this.baseCurrency} = ${convertedAmount} ${this.conversionCurrency}`
        );
      });
    } catch (error) {
      console.error("Error fetching conversion rates:");
    }
  }

  async getUserInput() {
    const userInput = await inquirer.prompt([
      {
        type: "list",
        name: "baseCurrency",
        message: "Choose your base currency: ",
        choices: this.availableCurrencies,
      },
      {
        type: "list",
        name: "conversionCurrency",
        message: "Choose your conversion currency: ",
        choices: this.availableCurrencies,
      },
      {
        type: "number",
        name: "currencyAmount",
        message: "Enter Amount You Want To Convert: ",
      },
    ]);

    this.baseCurrency = userInput.baseCurrency;
    this.conversionCurrency = userInput.conversionCurrency;
    let apiLink: string = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${this.baseCurrency}`;
    // this.currencyAmount = userInput.currencyAmount;
    this.getApiData(this.apiKey, apiLink, userInput.currencyAmount);
  }
}

const currency = new CurrencyConvertor();

currency.getUserInput();
