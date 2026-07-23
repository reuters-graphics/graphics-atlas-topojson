#!/usr/bin/env node
/**
 * build:maps — generate TopoJSON assets from reuters-graphics/country-borders.
 *
 * Pipeline: graphics-atlas-client#31.
 *   1. fetchInput  — download the pinned country-borders GeoJSON (polygons +
 *                    lines, 3 scales) via gh; record the source commit.
 *   2. buildPolygons — join iso_a2 -> atlas country; cut per country / UN region
 *                    / UN subregion / world; TopoJSON + quantize, 3 scales.
 *   3. buildLines  — spatially assign border lines to UN regions (+ global),
 *                    preserving the `disputed` flag; TopoJSON + quantize.
 */
const fetchInput = require('./fetchInput');
const buildPolygons = require('./buildPolygons');
const buildLines = require('./buildLines');

const run = async () => {
  fetchInput();
  buildPolygons();
  buildLines();
  console.log('Done.');
};

run();
