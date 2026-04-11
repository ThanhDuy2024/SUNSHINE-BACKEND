export interface orderDto {
  paymentMethod: string,
  address: string
  productArray: Array<Record<string, number>>
}