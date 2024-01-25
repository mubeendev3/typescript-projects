#!/usr/bin/env node

import fetch from "node-fetch";
import * as dotenv from "dotenv";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import boxen from "boxen";

dotenv.config();
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

  private apiKey: string = process.env.API_KEY || "";

  stopAnimations(animation: any, duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        animation.stop();
        resolve();
      }, duration * 1000);
    });
  }

  async welcomeAnimation() {
    const startingAnimation = chalkAnimation.neon(
      boxen(`Currency\nConvertor\nProject\nBy\nMubeen`, {
        title: "Currency Convertor",
        titleAlignment: "center",
        textAlignment: "center",
        borderStyle: "double",
        borderColor: "magenta",
      })
    );
    await this.stopAnimations(startingAnimation, 3);
    await this.getUserInput();
  }

  async endingAnimation(): Promise<void> {
    const endingAnimation = chalkAnimation.neon(
      boxen(`Thank You For Using Our Currency Convertor!`, {
        title: "Developed By Mubeen Mehmood",
        titleAlignment: "center",
        borderStyle: "classic",
        padding: 0.5,
        borderColor: "magenta",
      })
    );
    await this.stopAnimations(endingAnimation, 3);
  }

  private async getApiData(
    apiLink: string,
    baseCurrency: string,
    conversionCurrency: string,
    currencyAmount: number
  ) {
    try {
      const response = await fetch(apiLink);

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}, INVALID API KEY ... :()`
        );
      }

      const data: any = await response.json();

      let currencyRate = data["conversion_rates"][conversionCurrency];
      let convertedAmount: number = currencyAmount * currencyRate;

      console.log(
        `${currencyAmount} ${baseCurrency} = ${convertedAmount.toFixed(
          2
        )} ${conversionCurrency}`
      );

      this.endingAnimation();
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
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

    let apiLink: string = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${userInput.baseCurrency}`;
    await this.getApiData(
      apiLink,
      userInput.baseCurrency,
      userInput.conversionCurrency,
      userInput.currencyAmount
    );
  }
}

const currency = new CurrencyConvertor();
currency.welcomeAnimation();
