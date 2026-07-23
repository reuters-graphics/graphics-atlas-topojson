#!/usr/bin/env node
/**
 * build:maps — generate TopoJSON assets from reuters-graphics/country-borders.
 *
 * NOT YET IMPLEMENTED. Full plan: graphics-atlas-client#31.
 *
 * Planned pipeline:
 *   1. Resolve the pinned country-borders build input (submodule / recorded
 *      commit + .overture_release) into ./input.
 *   2. Read polygons (output/geojson/country-polygon-{low,medium,high}-detail.geojson)
 *      and lines (output/geojson/country-lines-{low,medium,high}-detail.geojson).
 *   3. Polygons: join iso_a2 -> AtlasMetadataClient.getCountry(); cut per
 *      country / UN region / UN subregion / world; convert to TopoJSON
 *      (topojson-server), quantize; write topojson/polygons/<scale>/<key>.json.
 *   4. Lines: assign each segment to UN region(s) via adm0_a3_l/adm0_a3_r ->
 *      getRegionByCountry(); bundle per UN region + global, keep `disputed`;
 *      write topojson/lines/<scale>/<key>.json.
 *   5. Small-geography rule: skip a scale for any geography absent from the
 *      source at that scale (no fallback).
 */

console.error('build:maps is not implemented yet — see graphics-atlas-client#31.');
process.exit(1);
