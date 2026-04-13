export interface orderDto {
  paymentMethod: string,
  email: string,
  phone: string,
  address: string
  shippingId: number
  productArray: Array<Record<string, number>>
}

export interface orderUpdateDto {
  id: number,
  email: string,
  phone: string,
  address: string,
}