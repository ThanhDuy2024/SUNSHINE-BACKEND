export interface productDto {
  productName: string,
  image: string,
  description: string,
  quantity: number,
  price: number,
  categoryArray: Array<number>,
  parameter: string,
}

export interface productFilterDto {
  search?: string,
  price?:string,
  quantity?:string,
  categoryId?: number,
  page: number,
  limit: number
}