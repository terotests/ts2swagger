#!/usr/bin/env node

import {createProject} from './index'
import * as defaults from './index'

const args = process.argv.slice(2);
if( args.length === 0 ) {
  console.log('ts2swagger <directory>')
  process.exit()
}
createProject({
  path: args[0],
  isServiceClass : defaults.isServiceClass,
  initSwaggerForService : defaults.initSwaggerForService
})
