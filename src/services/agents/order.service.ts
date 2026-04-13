import { pagination } from "../../helpers/pagination.helper";
import { Orders } from "../../Models/Orders.model";
import { OrdersProducts } from "../../Models/Orders_Products.model";
import { Users } from "../../Models/Users.model";
import { Op } from "sequelize";

export const getAllOrderService = async (account: any, filter: any) => {
  try {
    const query: any = {
      distinct: true,
      nest: true,
      where: {
        agentId: account.agentId,
      },
      offset: 0,
      limit: filter.limit || 5,
      order: [
        ['updatedAt', 'desc']
      ],
      include: [
        {
          model: Orders,
          as: 'orders',
          where: {
            status: {
              [Op.ne]: 'delete'
            }
          },
          required: true,
          include: [
            {
              model: Users,
              as: 'users'
            }
          ]
        },
      ]
    }

    let paginationF: any;
    if(filter.page) {
      const totalItem = await OrdersProducts.count(query);
      paginationF = pagination(filter.page, Number(totalItem), 0, filter.limit);
      query.offset = paginationF.skip
    }
    const orders = await OrdersProducts.findAll(query);

    return {
      data: orders,
      totalPage: paginationF.totalPage
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getOrderService = async () => {
  try {
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const putOrderService = async () => {
  try {
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}