
import {createProject} from './index'
import * as defaults from './index'

createProject({
  path:'src',
  isServiceClass : defaults.isServiceClass,
  initSwaggerForService : defaults.initSwaggerForService
})
