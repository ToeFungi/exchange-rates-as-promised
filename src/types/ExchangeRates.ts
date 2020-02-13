interface ExchangeRates {
  [name: string]: {
    latest: string
    [name: string]: string
  }
}

export { ExchangeRates }
