#!/usr/bin/env node
const { readFile } = require('fs/promises');
const { resolve } = require('path');

async function main() {
  const manifestPath = resolve('manifest.json');
  const readmePath = resolve('README.md');

  let manifest;
  try {
    const manifestRaw = await readFile(manifestPath, 'utf8');
    manifest = JSON.parse(manifestRaw);
  } catch (error) {
    console.error(`Failed to read or parse manifest.json: ${error.message}`);
    process.exit(1);
  }

  const manifestVersion = manifest && manifest.manifest_version;
  if (typeof manifestVersion !== 'string' || manifestVersion.trim() === '') {
    console.error('manifest.json is missing "manifest_version" or it is not a string.');
    process.exit(1);
  }

  let readme;
  try {
    readme = await readFile(readmePath, 'utf8');
  } catch (error) {
    console.error(`Failed to read README.md: ${error.message}`);
    process.exit(1);
  }

  const versionMatch = readme.match(/Aktuelle Version:\s*\*\*v(?<version>[0-9]+(?:\.[0-9]+)*)\*\*/i);
  if (!versionMatch || !versionMatch.groups || !versionMatch.groups.version) {
    console.error('Could not find the README version string (e.g. "Aktuelle Version: **v1.6**").');
    process.exit(1);
  }

  const readmeVersion = versionMatch.groups.version;

  if (manifestVersion !== readmeVersion) {
    console.error(`manifest_version (${manifestVersion}) does not match README version (${readmeVersion}).`);
    process.exit(1);
  }

  console.log(`Manifest version ${manifestVersion} matches README version v${readmeVersion}.`);
}

main();
