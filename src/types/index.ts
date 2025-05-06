export interface IUser {
  address: string
  number: number
  payment: string
  email: string
}

export interface IItem {
  _id: string
  index?:number
  tag?: string
  title: string
  description?: string
  image?: string
  price: number | null
}

export type IUserAddressAndPayment = Pick<IUser, 'address' | 'payment'>

export type IUserNumberAndEmail = Pick<IUser, 'number' | 'email'>