import {z} from "zod"

export const SignupSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
}) 


export const AddressSchema=z.object({
    lineOne:z.string(),
    lineTwo:z.string(),
  pincode:z.string().length(6),
  country:z.string(),
  city:z.string(),

}) 

export const UpdateUserSchema=z.object({
    name:z.string().optional(),
    defaultShippingAddressid:z.number().optional() ,
    defaultBillingAddressid:z.number().optional() 
})