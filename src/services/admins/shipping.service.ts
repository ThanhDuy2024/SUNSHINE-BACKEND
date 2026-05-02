import { Op } from "sequelize";
import { shippingDto } from "../../dto/shipping.dto";
import { momentFormat } from "../../helpers/moment.helper";
import { pagination } from "../../helpers/pagination.helper";
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

export const getAllShippingController = async (filter: Record<string, any>) => {
  try {
    const query: any = {
      nest: true,
      distinct: true,
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

    let paginationFunc: any;
    if (filter.page) {
      const totalItem = await Shipping.count(query);
      paginationFunc = pagination(filter.page, Number(totalItem), 0, filter.limit);
      query.offset = paginationFunc.skip;
    }

    if (filter.search !== "null") {
      query.where.shippingName = {
        [Op.like]: `%${filter.search}%`
      }
    }

    if (filter.status) {
      query.where.status = filter.status
    }
    const shipping = await Shipping.findAll(query);
    return {
      data: shipping,
      totalPage: paginationFunc.totalPage,
    }
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

    if (!shipping) {
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

    if (!shipping) {
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