import { Op } from "sequelize";
import { categoryDto, categoryFilterDto } from "../../dto/categories.dto";
import { Categories } from "../../Models/Categories.model";
import { momentFormat } from "../../helpers/moment.helper";
import { Admin } from "../../Models/Admins.model";
import { pagination } from "../../helpers/pagination.helper";

export const postCategoryService = async (data: categoryDto, adminId: number) => {
    try {
        const category = await Categories.findOne({
            where: {
                categoryName: {
                    [Op.like]: `%${data.categoryName}%`
                }
            }
        });
        if (category) {
            return false
        };

        await Categories.create({
            categoryName: data.categoryName,
            image: data.image,
            createdBy: adminId,
            updatedBy: adminId
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const getAllCategoryService = async (filter?: categoryFilterDto) => {
    try {
        const query: any = {
            nest: true,
            include: [
                {
                    model: Admin,
                    as: "createdByAdmin",
                    attributes: ['id', 'fullName']
                },
                {
                    model: Admin,
                    as: 'updatedByAdmin',
                    attributes: ['id', 'fullName']
                }
            ],
            where: {
                status: {
                    [Op.ne]: 'delete'
                }
            },
            offset: 0,
            limit: filter?.limit,
        }

        if (filter?.search !== 'null' && filter?.search) {
            query.where = {
                categoryName: {
                    [Op.like]: `%${filter.search}%`
                }
            }
        }

        if (filter?.status && (filter.status === 'active' || filter.status === 'inactive' || filter.status === 'delete')) {
            query.where = {
                status: filter.status
            }
        }

        if (filter?.updatedById) {
            query.where = {
                updatedBy: filter.updatedById
            }
        }

        if (filter?.createdById) {
            query.where = {
                createdBy: filter.createdById
            }
        }

        const totalCategories = await Categories.count(query);
        const skip = 0;
        let objectPagination: any = {}
        if (filter?.page) {
            objectPagination = pagination(filter.page, Number(totalCategories), skip, Number(filter.limit));
            query.offset = objectPagination.skip;
        }

        const categories = await Categories.findAll(query);

        const data: any = []
        for (const item of categories) {
            const itemData = item.toJSON();
            let rawData = {
                ...itemData,
                createdAtFormat: momentFormat(itemData.createdAt),
                updatedAtFormat: momentFormat(itemData.updatedAt),
            };
            data.push(rawData);
        }
        return {
            data: data,
            pagination: objectPagination
        };
    } catch (error) {
        console.log(error);
        return false
    }
}

export const putCategoryService = async (data: categoryDto, categoryId: number, adminId: number) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: categoryId,
                status: {
                    [Op.ne]: 'delete'
                }
            }
        });

        if (!category) {
            return false
        };

        if (data.status !== 'active' && data.status !== 'inactive') {
            return false
        }

        await category.update({
            categoryName: data.categoryName,
            image: data.image,
            updatedBy: adminId,
            status: data.status
        });
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const getCategoryService = async (categoryId: number) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: categoryId,
                status: {
                    [Op.ne]: 'delete'
                }
            },
            include: [
                {
                    model: Admin,
                    as: 'createdByAdmin'
                },
                {
                    model: Admin,
                    as: 'updatedByAdmin'
                },
            ]
        });
        if (!category) {
            return false
        }

        category.dataValues.createdAtFormat = momentFormat(category.dataValues.createdAt);
        category.dataValues.updatedAtFormat = momentFormat(category.dataValues.updatedAt);
        return category.dataValues;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const deleteCategoryService = async (categoryId: number, adminId: number) => {
    try {
        const category = await Categories.findOne({
            where: {
                id: categoryId,
                status: {
                    [Op.ne]: 'delete'
                }
            }
        });

        if (!category) {
            return false
        };

        await category.update({
            status: 'delete',
            updatedBy: adminId
        })
        return true
    } catch (error) {
        return false
    }
}