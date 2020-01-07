/**
 * Representation of response for historical exchange rates
 */
interface HistoricalRates {
  /**
   * Datestamp yyyy-mm-dd of the exchange rate
   */
  [name: string]: {
    /**
     * Currency and value
     */
    [name: string]: number
  }
}

export { HistoricalRates }
