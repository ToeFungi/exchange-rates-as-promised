/**
 * Representation of supported query parameters used by the exchange rates API
 */
interface Queries {
  /**
   * Base currency to calculate conversions against
   */
  base?: string
  /**
   * Array of currencies to have conversions returned for
   */
  symbols?: string
}

export { Queries }
