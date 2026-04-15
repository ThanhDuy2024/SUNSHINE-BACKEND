import { Products } from "../../Models/Products.model";
import { Agents } from "../../Models/Agent.model";
import { Op } from "sequelize";
import { pagination } from "../../helpers/pagination.helper";
import { Categories } from "../../Models/Categories.model";

export const getAllProductService = async (filter: Record<string, number>) => {
  try {
    const query: any = {
      nest: true,
      where: {
        status: 'active'
      },
      order: [
        ['updatedAt', 'desc']
      ],
      offset: 0,
      limit: filter.limit,
      include: [
        {
          model: Agents,
          as: 'agentedBy',
          attributes: ['id', 'agentName']
        },
      ]
    }

    if (filter.search) {
      query.where.productName = {
        [Op.like]: `%${filter.search}%`
      }
    };

    if (String(filter.price).toLocaleLowerCase() === 'desc') {
      query.order = [
        ['price', 'DESC']
      ]
    }

    if (String(filter.price).toLocaleLowerCase() === 'asc') {
      query.order = [
        ['price', 'ASC']
      ]
    }

    if (Number(filter.category)) {
      query.include.push({
        model: Categories,
        as: 'categories',
        attributes: ['id', 'categoryName'],
        where: {
          id: filter.category,
          status: 'active'
        },
        require: true,
      })
    }

    let paginationF: any;
    if (filter.page) {
      const totalItem = await Products.count(query);
      paginationF = pagination(filter.page, Number(totalItem), 0, filter.limit);
      query.skip = paginationF.skip;
    }
    const products = await Products.findAll(query);

    if (!products) {
      return false
    };

    return {
      products: products,
      totalPage: paginationF.totalPage,
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

export const detailProductService = async (productId: number) => {
  try {
    console.log(productId);
    const product = await Products.findOne({
      nest: true,
      where: {
        id: productId,
        status: 'active',
      },
      include: [
        {
          model: Agents,
          as: 'agentedBy',
          attributes: ['id', 'agentName', 'image']
        },
        {
          model: Categories,
          as: 'categories',
          attributes: ['id', 'categoryName']
        }
      ]
    });

    if(!product) {
      return false
    }
    return product
  } catch (error) {
    console.log(error)
    return false
  }
}