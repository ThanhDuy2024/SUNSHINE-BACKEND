export interface categoryDto {
    categoryName: string,
    image?: string,
    status?: string
}

// search, status, createdById, updatedById, page
export interface categoryFilterDto {
    search?: string,
    status?: string,
    createdById?: number,
    updatedById?: number,
    page?: number
    limit?: number
}