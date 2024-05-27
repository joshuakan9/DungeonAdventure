/**
 * @typedef {Object} WORLD
 * @property {string} WALL_LEFT - The left wall character representation.
 * @property {string} WALL_RIGHT - The right wall character representation.
 * @property {string} WALL_TOP - The top wall character representation.
 * @property {string} WALL_BOTTOM - The bottom wall character representation.
 * @property {string} WALL_TOPLEFTCORNER - The top left corner wall character representation.
 * @property {string} WALL_TOPRIGHTCORNER - The top right corner wall character representation.
 * @property {string} WALL_BOTTOMLEFTCORNER - The bottom left corner wall character representation.
 * @property {string} WALL_BOTTOMRIGHTCORNER - The bottom right corner wall character representation.
 * @property {string} GROUND - The ground character representation.
 */
const WORLD = {
    WALL_LEFT: '||',
    WALL_RIGHT: '|',
    WALL_TOP: '‾',
    WALL_BOTTOM: '_',
    WALL_TOPLEFTCORNER: '⌜',
    WALL_TOPRIGHTCORNER: '⌝',
    WALL_BOTTOMLEFTCORNER: '⌞',
    WALL_BOTTOMRIGHTCORNER: '⌟',
    GROUND: '□'
}