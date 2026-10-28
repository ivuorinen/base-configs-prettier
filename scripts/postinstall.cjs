'use strict'

/* eslint no-console: "off" -- CLI app that gives users feedback */

const { writeStarterConfig } = require('@ivuorinen/config-checker')

// This runs on every consumer install, and a non-zero exit fails that whole
// install. writeStarterConfig never throws: it falls back to the working
// directory when INIT_CWD is unset, creates the file with 'wx' so a config a
// concurrent install wrote is never overwritten, and returns a failed write for
// this script to report.
const fileConfigObject = '@ivuorinen/prettier-config'
const result = writeStarterConfig('prettier', '.prettierrc.json', JSON.stringify(fileConfigObject))

if (result.status === 'found') {
  console.log('prettier-config: Found existing prettier config file, skipping creation.')
  console.log('prettier-config: If you want to create a new config file, please remove the existing one.')
  console.log(`prettier-config: Found config files at: ${result.found.join(', ')}`)
} else if (result.status === 'failed') {
  console.log(`prettier-config: could not write ${result.filePath} (${result.error.code || result.error.message}).`)
  console.log(`prettier-config: create it manually containing: "${fileConfigObject}"`)
}
