# @reuters-graphics/graphics-atlas-topojson

TopoJSON map assets for [`@reuters-graphics/graphics-atlas-client`](https://github.com/reuters-graphics/graphics-atlas-client) — **country polygons** and **border lines** (with a `disputed` flag) at three cartographic scales.

Split out from the metadata client so that client stays lightweight (~240 KB): consumers get map geometry on demand from the CDN via the client's `fetch*` methods and only install this package if they need the files on disk. Versioned independently, so a border refresh is a **data release** rather than a code release.

> **Status: scaffold.** The build pipeline is not implemented yet — tracked in [graphics-atlas-client#31](https://github.com/reuters-graphics/graphics-atlas-client/issues/31).

## Source

Built from [`reuters-graphics/country-borders`](https://github.com/reuters-graphics/country-borders) (Overture Maps, aligned with Reuters editorial map policy), pinned as a build-time input. See [`DATA-LICENSE.md`](./DATA-LICENSE.md) — data is ODbL; attribute maps with `© OpenStreetMap contributors, Overture Maps Foundation`.

## Planned output layout

```
topojson/
  polygons/{low,medium,high}/{world,<region-slug>,<subregion-slug>,<ISO2>}.json   # ~834 files
  lines/{low,medium,high}/{world,<un-region-slug>}.json                            # 21 files, carry `disputed`
```

- **Polygons** — land fill, keyed by `iso_a2` (== the client's `isoAlpha2`); cut per country (249), UN region (6), UN subregion (22) and world, at each scale.
- **Lines** — border stroke; cut by the client's **6 UN regions + global**, styled by the `disputed` (0/1) attribute. Region assignment is by the countries each segment borders (`adm0_a3_l` / `adm0_a3_r` → the client's `getRegionByCountry`).
- **Scales** — `low` / `medium` / `high` (replaces the old `.50m`/`.110m` scheme).

### Small-geography rule

Coarser scales omit the smallest islands (source geometry only exists at higher detail). We **do not** fall back to a finer scale — a geography simply won't have a `low`/`medium` file if the source lacks it there. Consumers should handle a missing scale (the client's `fetch*` surfaces a clear error).

## Delivery

Published to npm; served to clients over the jsDelivr CDN at version-pinned, immutable URLs (`https://cdn.jsdelivr.net/npm/@reuters-graphics/graphics-atlas-topojson@<version>/topojson/...`). `graphics-atlas-client` references it as an optional peer dependency and lazy-loads local files if installed, else fetches from the CDN.

## Updates

Border data is a build-time input baked into published assets — **no automatic runtime updates**. To refresh: bump the pinned `country-borders` input, re-run `build:maps`, and publish. A CI action may open a reviewable PR when the upstream source changes.

## License

Code: MIT (`LICENSE`). Data: ODbL (`DATA-LICENSE.md`).
