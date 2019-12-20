import { Currencies, ExchangeRate } from '../../src'

const exchangeRate = new ExchangeRate()

exchangeRate.setCurrencies([
  Currencies.ZAR,
  Currencies.GBP
])
  .setBaseCurrency(Currencies.GBP)
  .setDate(new Date('2012-02-14'))
  .getRates()
  .then(console.log)
  .catch(console.error)
