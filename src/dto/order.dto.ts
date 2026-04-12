export interface orderDto {
  paymentMethod: string,
  address: string
  productArray: Array<Record<string, number>>
}

export interface orderUpdateDto {
  id: number,
  email: string,
  phone: string,
  address: string,
}