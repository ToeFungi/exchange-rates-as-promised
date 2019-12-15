import { Currencies, ExchangeRate } from '../../src'

const exchangeRate = new ExchangeRate()

exchangeRate.setCurrencies([
  Currencies.ZAR,
  Currencies.GBP
])
  .setBaseCurrency(Currencies.GBP)
  .getRates()
  .then(console.log)
  .catch(console.error)
