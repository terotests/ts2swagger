

/**
 * @model true 
 */
export class SomeKeyWord {
  name = ''
}

/**
 * @model 1 
 */
export class ErrorNotFound {
  errorCode = 404
  message?: string
}


/**
 * @model 
 */
export class ErrorForbidden {
  errorCode = 404
  message?: string
}


/**
 * @model true 
 */
export class SomeReturnValue {
  myValue = 100
  response = ''
  someList : string[]
  keys : SomeKeyWord[]
}


/**
 * @model true 
 */
export class CreateDevice {
  name: string
  description: string
}

/**
 * @model true 
 */
export class CreateUser {
  name: string
  address: string
  age:number
}

/**
 * @model true 
 */
export interface TestUser {
  name:string
  isHidden?:boolean
}

/**
 * @model true
 */
export class Device {
  id: number
  name: string
}
