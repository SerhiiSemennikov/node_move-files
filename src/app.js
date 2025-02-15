/* eslint-disable no-console */
'use strict';

const fs = require('fs/promises');
const path = require('path');

const moveFiles = async () => {
  const args = process.argv.slice(2);

  const [from, to] = args;

  if (args.length < 2) {
    console.error('You need fileName and destination');

    return;
  }

  try {
    const isDirectory = fs.existsSync(to) && fs.lstatSync(to).isDirectory();

    const updatedPath = isDirectory ? path.join(to, path.basename(from)) : to;

    await fs.move(from, updatedPath);
    console.log('success!');
  } catch (error) {
    if (!from) {
      throw new Error('No source!');
    }

    if (!to) {
      throw new Error('No destinion!');
    }
    console.error('Rename error!', error);
  }
};

moveFiles();

module.exports = {
  moveFiles,
};
