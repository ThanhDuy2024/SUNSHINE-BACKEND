import { Op, where } from "sequelize";
import { productDto, productFilterDto } from "../../dto/products.dto";
import { Agents } from "../../Models/Agent.model";
import { Categories } from "../../Models/Categories.model";
import { Products } from "../../Models/Products.model";
import '../../Models/Products_Categories.model';
import { agentCheck } from "../../helpers/agent.helper";
import { pagination } from "../../helpers/pagination.helper";
import { momentFormat } from "../../helpers/moment.helper";
export const postProductService = async (data: productDto, userId: number) => {
  try {
    const agent = await Agents.findOne({
      where: {
        userId: userId,
        status: 'active'
      }
    });

    if (!agent) {
      return false
    }

    const category: any = await Categories.findAll({
      raw: true,
      nest: true,
      where: {
        id: {
          [Op.in]: data.categoryArray,
        }
      }
    });

    if (!category || category.empty) {
      return false
    }

    const product: any = await Products.create({
      productName: data.productName,
      description: data.description,
      image: data.image,
      quantity: data.quantity,
      parameter: data.parameter,
      price: data.price,
      agentId: agent.dataValues.id,
      updatedBy: userId,
      createdBy: userId,
    })

    for (const item of category) {
      await product.addCategories(item.id, { through: { selfGranted: false } })
    }

    return true

  } catch (error) {
    console.log(error);
    return false
  }
}

export const getAllproductService = async (userId: number, filter: productFilterDto) => {
  try {
    const agent = await agentCheck(userId);

    if (agent === false) {
      return false
    }

    const query: any = {
      nest: true,
      where: {
        agentId: agent.id,
        status: {
          [Op.in]: ['active', 'inactive'],
        }
      },
      include: [
        {
          model: Categories,
          as: 'categories',
          where: {},
          require: true
        },
        {
          model: Agents,
          as: 'agentedBy'
        }
      ],
      order: [
        ['updatedAt', 'desc']
      ],
      offset: 0,
      limit: filter.limit
    }

    if (filter.search) {
      query.where.productName = {
        [Op.like]: `%${filter.search}%`
      }
    }

    if (filter.price) {
      query.order = [
        ['price', filter.price.toLocaleUpperCase()]
      ]
    }

    if (filter.quantity) {
      query.order = [
        ['quantity', filter.quantity.toLocaleUpperCase()]
      ]
    };

    if (filter.categoryId) {
      query.include[0].where.id = filter.categoryId;
    }
    let paginationF;
    if (filter.page) {
      const totalItem = await Products.count(query);
      paginationF = pagination(filter.page, Number(totalItem), 0, filter.limit);
      query.offset = paginationF.skip;
    }
    const product = await Products.findAll(query);

    return {
      product,
      totalPage: paginationF?.totalPage
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getproductService = async (userId: number, productId: number) => {
  try {
    const agent = await agentCheck(userId);
    if (!agent) {
      return false
    }
    const product = await Products.findOne({
      nest: true,
      where: {
        id: productId,
        agentId: agent.id,
        status: {
          [Op.in]: ['active', 'inactive']
        }
      },
      include: [
        {
          model: Categories,
          as: 'categories'
        },
        {
          model: Agents,
          as: 'agentedBy'
        }
      ]
    });

    if (!product) {
      return {}
    }

    const data: any = product.dataValues;
    data.createdAtFormat = momentFormat(data.createdAt)
    data.updatedAtFormat = momentFormat(data.updatedAt)
    return data
  } catch (error) {
    console.log(error);
    return false
  }
}

export const putproductService = async () => {
  try {
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const deleteproductService = async () => {
  try {
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}