
import * as fe from './api'
import axios from 'axios'

console.log('frontend sample')

async function test() { 
  const api = fe.N( axios )
  try {
    console.log( await api.testAnyResp('error') )
  } catch(e) {
    // HTTP protocol errors go here...
    console.log(e)
    console.log(e.response)
    console.log(e.response.status)
  }
}

test()


