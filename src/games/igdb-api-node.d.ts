import { Apicalypse, ApicalypseConfig } from "apicalypse";

/**
 * Generates a tag number
 * @arg {number} category Type of tag (game, genre, theme etc)
 * @arg {number} id The ID number of the entity.
 * @returns {number} A tag number
 */
export const getTagNumber: (category: number, id: number) => number;

/**
 * Creates the IGDB API object, populated with methods for building a query.
 * Can grab api key from process.env.IGDB_API_KEY or global.IGDB_API_KEY
 * @arg {string} [apiKey]
 * @returns {Apicalypse}
 */
declare const igdb: (apiKey?: string, opts?: ApicalypseConfig) => Apicalypse;
export default igdb
