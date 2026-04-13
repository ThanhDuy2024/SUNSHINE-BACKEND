import { shippingDto } from "../../dto/shipping.dto";
import { momentFormat } from "../../helpers/moment.helper";
import { Admin } from "../../Models/Admins.model";
import { Shipping } from "../../Models/Shipping.model";

export const postShippingController = async (adminId: number, data: shippingDto) => {
  try {
    await Shipping.create({
      shippingName: data.shippingName,
      shippingPrice: data.shippingPrice,
      shippingDuring: data.shippingDuring,
      createdBy: adminId,
      updatedBy: adminId,
    })
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getAllShippingController = async (filter: Record<string, number>) => {
  try {
    const query: any = {
      nest: true,
      where: {},
      order: [
        ['updatedAt', 'desc']
      ],
      offset: 0,
      limit: filter.limit || 5,
      include: [
        {
          model: Admin,
          as: "createdByAdmin",
          attributes: ['id', 'fullName']
        }, {
          model: Admin,
          as: "updatedByAdmin",
          attributes: ['id', 'fullName']
        }
      ]
    }
    const shipping = await Shipping.findAll(query);
    return shipping
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getShippingController = async (shippingId: number) => {
  try {
    const shipping: any = await Shipping.findOne({
      nest: true,
      where: {
        id: shippingId,
      },
      include: [
        {
          model: Admin,
          as: "createdByAdmin",
          attributes: ['id', 'fullName']
        }, {
          model: Admin,
          as: "updatedByAdmin",
          attributes: ['id', 'fullName']
        }
      ]
    })

    if(!shipping) {
      return false
    }

    const data: any = shipping.toJSON();
    data.createdAtFormat = momentFormat(data.createdAt);
    data.updatedAtFormat = momentFormat(data.updatedAt);
    return data
  } catch (error) {
    console.log(error);
    return false
  }
}

export const putShippingController = async (adminId: number, shippingId: number, data: shippingDto) => {
  try {
    const shipping = await Shipping.findOne({
      where: {
        id: shippingId,
      }
    });

    if(!shipping) {
      return false
    }

    await shipping.update({
      shippingName: data.shippingName,
      shippingPrice: data.shippingPrice,
      shippingDring: data.shippingDuring,
      status: data.status,
      updatedBy: adminId,
    })
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}