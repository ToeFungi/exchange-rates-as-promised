import { Currencies } from '..'

/**
 * Representation of the response from the Exchange Rates API
 */
interface ExchangeResponse {
  /**
   * The last date the data was updated
   */
  date: string
  /**
   * Base currency to convert against
   */
  base: Currencies
  /**
   * Conversion rates against the base currency
   */
  rates: {
    /**
     * Currency and value
     */
    [name: string]: number
  }
}

export { ExchangeResponse }
