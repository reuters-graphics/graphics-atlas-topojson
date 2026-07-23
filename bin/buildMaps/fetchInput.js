const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = 'reuters-graphics/country-borders';
const INPUT_DIR = path.resolve(__dirname, '../../input');
const FILES = [
  'country-polygon-low-detail.geojson',
  'country-polygon-medium-detail.geojson',
  'country-polygon-high-detail.geojson',
  'country-lines-low-detail.geojson',
  'country-lines-medium-detail.geojson',
  'country-lines-high-detail.geojson',
];

// Downloads the pinned country-borders GeoJSON build inputs via the GitHub CLI
// (the repo is private, so this needs an authenticated `gh`). Records the
// resolved commit SHA in input/.country-borders-sha for provenance.
module.exports = ({ force = false } = {}) => {
  fs.mkdirSync(INPUT_DIR, { recursive: true });

  const haveAll = FILES.every(f => fs.existsSync(path.join(INPUT_DIR, f)));
  if (haveAll && !force) {
    console.log('Input already present — skipping download (pass { force: true } to refresh).');
    return;
  }

  console.log(`Fetching country-borders GeoJSON via gh (${REPO})`);
  const sha = execSync(`gh api repos/${REPO}/commits/main --jq .sha`).toString().trim();
  fs.writeFileSync(path.join(INPUT_DIR, '.country-borders-sha'), `${sha}\n`);
  console.log(`  source commit: ${sha}`);

  for (const f of FILES) {
    const dest = path.join(INPUT_DIR, f);
    execSync(
      `gh api "repos/${REPO}/contents/output/geojson/${f}" -H "Accept: application/vnd.github.raw" > "${dest}"`,
      { shell: '/bin/bash' }
    );
    console.log(`  ${f}`);
  }
};
