import { Op, or } from "sequelize";
import { orderDto } from "../../dto/order.dto";
import { Products } from "../../Models/Products.model";
import { Orders } from "../../Models/Orders.model";
import { OrdersProducts } from "../../Models/Orders_Products.model";
import { pagination } from "../../helpers/pagination.helper";

export const postOrderService = async (userId: number, data: orderDto) => {
  try {
    let productArray: any = data.productArray;
    let dataProduct: any = [];
    let totalPrice: any = 0;
    for (const item of productArray) {
      const checkProduct = await Products.findOne({
        where: {
          id: item.productId,
          status: 'active',
          quantity: {
            [Op.gte]: item.quantity
          },
          agentId: item.agentId
        }
      });
      if (!checkProduct) {
        return false;
      }
      const productRaw: any = {};
      productRaw.productId = checkProduct.dataValues.id;
      productRaw.productName = checkProduct.dataValues.productName;
      productRaw.agentId = checkProduct.dataValues.agentId;
      productRaw.quantity = checkProduct.dataValues.quantity
      productRaw.productQuantityInOrder = item.quantity;
      productRaw.price = checkProduct.dataValues.price;
      productRaw.totalPriceInItem = (productRaw.price * item.quantity);
      productRaw.image = checkProduct.dataValues.image || null

      totalPrice += productRaw.totalPriceInItem;
      dataProduct.push(productRaw);
    }

    const order = await Orders.create({
      userId: userId,
      paymentMethod: data.paymentMethod,
      address: data.address,
      totalPrice: totalPrice
    })

    for (const item of dataProduct) {
      await OrdersProducts.create({
        productId: item.productId,
        productName: item.productName,
        agentId: item.agentId,
        orderId: order.dataValues.id,
        quantity: item.productQuantityInOrder,
        price: item.price,
        image: item.image
      })

      await Products.update({
        quantity: Products.sequelize?.literal(`quantity - ${item.productQuantityInOrder}`) || 0
      }, {
        where: {
          id: item.productId,
          agentId: item.agentId,
        }
      })
    }

    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getAllOrderService = async (userId: number, filter: Record<string, number>) => {
  try {
    const query: any = {
      nest: true,
      distinct: true,
      where: {
        userId: userId,
        status: {
          [Op.in]: ['active', 'inactive', 'complete'],
        }
      },
      include: {
        model: OrdersProducts,
        as: "products"
      },
      order: [
        ['updatedAt', 'desc'],
      ],
      offset: 0,
      limit: 2
    };

    let paginationF: any;
    if(filter.page) {
      const totalItem = await Orders.count(query);
      paginationF = pagination(filter.page, Number(totalItem), 0, filter.limit);
      query.offset = paginationF.skip;
    }
    const myOrder: any = await Orders.findAll(query);
    return {
      data: myOrder,
      totalPage: paginationF.totalPage
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const putOrderService = async (userId: number, dataUpdate: any) => {
  try {
    const order = await Orders.findOne({
      where: {
        id: dataUpdate.id,
        status: {
          [Op.in]:['active', 'inactive'],
        },
        userId: userId,
      }
    });

    if(!order) {
      return false
    };

    await order.update({
      email: dataUpdate.email,
      phone: dataUpdate.phone,
      address: dataUpdate.address,
    })
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getOrderService = async (userId: number, orderId: number) => {
  try {
    const order = await Orders.findOne({
      nest: true,
      where: {
        id: orderId,
        status: {
          [Op.in]: ['active', 'inactive'],
        },
        userId: userId
      },
      include: [
        {
          model: OrdersProducts,
          as: 'products'
        }
      ]
    });

    if(!order) {
      return false
    }
    return order;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const deleteOrderService = async (userId: number, orderId: number) => {
    try {
    const order = await Orders.findOne({
      nest: true,
      where: {
        id: orderId,
        status: {
          [Op.in]: ['active', 'inactive'],
        },
        userId: userId
      },
    });

    if(!order) {
      return false
    }

    await order.update({
      status: 'delete'
    })
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}