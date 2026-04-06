export const pagination = (page: number, totalItem: number, skip: number, limit: number) => {
    const totalPage = Math.ceil(totalItem / limit);
    if(page > 0 && page <= totalPage) {
        skip = (page - 1) * limit;
    } 
    return {
        totalPage: totalPage,
        skip: skip,
    }
}