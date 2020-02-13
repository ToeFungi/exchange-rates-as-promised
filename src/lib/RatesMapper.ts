import { ExchangeRates, ExchangeResponse, HistoricalRates, Rates } from '..'

class RatesMapper {
  static remapRatesResponse(data: ExchangeResponse): ExchangeRates {
    return this.mapHistoricalRates(data.rates as HistoricalRates)
  }

  private static mapRates(typedData: Rates) {
    const currencies = Object.keys(typedData)

    const rateToLatest = (currency: string) => {
      const mappedRate = {
        latest: typedData[currency]
      }
      return [ currency, mappedRate ]
    }

    const mappedCurrencies = currencies.map(rateToLatest)
    return Object.fromEntries(mappedCurrencies)
  }

  /**
   * Map historical rates into a user-friendly format
   */
  private static mapHistoricalRates(typedData: HistoricalRates) {
    // Get the dates from the rates
    const dates = Object.keys(typedData)

    /**
     * Determines the latest datestamp returned in the response
     */
    const toLatestDatestamp = (acc: string, date: string) => {
      if (acc < date) {
        return date
      }
      return acc
    }

    /**
     * Map the currencies to the appropriate symbol designation
     */
    const currencyToSymbol = (symbol: string) => {
      // Map the dates with the appropriate set of rates
      const datedArrays = dates.map((date: string) => {
        return [ [ date ], typedData.rates[date][symbol] ]
      })

      // Create an object with the appropriate mapped currency and rates
      return [ [ symbol ], Object.fromEntries(datedArrays) ]
    }

    // Get the latest datestamp from the response
    const latestDate = dates.reduce(toLatestDatestamp)

    // Determine the symbols from the response
    const symbols = Object.keys(typedData[latestDate])

    // Map the rates into designated format
    const mappedRatesData = symbols.map(currencyToSymbol)

    // Create the response object using the mapped rates
    return Object.fromEntries(mappedRatesData)
  }
}

export { RatesMapper }
