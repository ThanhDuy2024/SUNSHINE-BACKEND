import { Op } from "sequelize";
import { categoryDto, categoryFilterDto } from "../../dto/categories.dto";
import { Categories } from "../../Models/Categories.model";
import { momentFormat } from "../../helpers/moment.helper";
import { Admin } from "../../Models/Admins.model";

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

export const getAllCategoryService = async (filter?:categoryFilterDto) => {
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
            where: {}
        }

        if(filter?.search !== 'null' && filter?.search) {
            query.where = {
                categoryName: {
                    [Op.like]: `%${filter.search}%`
                }
            }
        }

        if(filter?.status && (filter.status === 'active' || filter.status === 'inactive' || filter.status === 'delete')) {
            query.where = {
                status: filter.status
            }
        }

        if(filter?.updatedById) {
            query.where = {
                updatedBy: filter.updatedById
            }
        } 

        if(filter?.createdById) {
            query.where = {
                createdBy: filter.createdById
            }
        }
        //Lam toi day, con page voi limit
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
        return data;
    } catch (error) {
        console.log(error);
        return false
    }
}