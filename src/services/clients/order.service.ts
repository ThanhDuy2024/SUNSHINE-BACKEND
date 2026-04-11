import { Op } from "sequelize";
import { orderDto } from "../../dto/order.dto";
import { Products } from "../../Models/Products.model";
import { Orders } from "../../Models/Orders.model";
import { OrdersProducts } from "../../Models/Orders_Products.model";

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