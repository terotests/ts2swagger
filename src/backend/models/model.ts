

/**
 * @model true 
 */
export class SomeKeyWord {
  name = ''
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
  /** users name is here... */
  name: string 
  /** users address, not ginve with any specificity */
  address: string
  /** ---> Age of the user... */
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
