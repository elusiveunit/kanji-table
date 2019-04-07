/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const globby = require('globby');
const gzipSize = require('gzip-size');
const prettyBytes = require('pretty-bytes');
const { table } = require('table');

(async () => {
  const paths = await globby(['./build/index.html', './build/*.(css|js)']);
  const fileData = await Promise.all(
    paths.map(async (p) => {
      const stat = fs.statSync(p);
      const gzip = await gzipSize.file(p);
      return {
        name: path.basename(p),
        size: prettyBytes(stat.size),
        gzip: prettyBytes(gzip),
      };
    }),
  );
  const tableData = [['File', 'Size', 'gzip size']].concat(
    fileData.map((f) => [f.name, f.size, f.gzip]),
  );
  console.log('\nSizes');
  console.log(table(tableData));
})();
