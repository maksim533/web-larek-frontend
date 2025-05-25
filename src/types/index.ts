import { IEvents } from "../components/base/events"

export interface IUser {
  address: string
  phone: string
  payment: string
  email: string
  
}


export interface IItem {
  id: string
  category: string
  title: string
  description: string
  image: string
  price: number | null
}

export interface IItemView extends IItem {
   index?:number
   itemButton?: boolean
}

export interface IOrder extends IUser {
  total: number;
  items: string[];
}


export interface IOrderResult {
  id: string;
  total: number
}

export type FormErrors = Partial<Record<keyof IUser, string>>

