import { Op } from "sequelize";
import { actionDto } from "../../dto/agents.dto";
import { momentFormat } from "../../helpers/moment.helper";
import { Admin } from "../../Models/Admins.model";
import { Agents } from "../../Models/Agent.model";
import { Users } from "../../Models/Users.model";
import { pagination } from "../../helpers/pagination.helper";
export const getAllAgentService = async (status: string, search: any, page: Number, limit: number) => {
    try {
        const query: any = {
            nest: true,
            distinct: true,
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                },
                {
                    model: Admin,
                    as: "admin",
                }
            ],
            where: {
                status: ["active", "inactive"]
            },
            order: [
                ["updatedAt", "DESC"]
            ],
            offset: 0,
            limit: limit,
        }

        if(status === "notAc") {
            query.where.status = status
        } 

        if(search !== "null") {
            query.where.agentName = {
                [Op.like]: `%${search}%`
            }
        }

        let paginationOb: any;
        if(page) {
            const totalItem = await Agents.count(query);
            paginationOb = pagination(Number(page), Number(totalItem), 0, limit);
            query.offset = paginationOb.skip;
        }
        const data = await Agents.findAll(query)
        const finalData = []
        for (const item of data) {
            const itemData = item.toJSON()
            let rawData = {
                ...itemData,
                createdAtFormat: momentFormat(itemData.createdAt),
                updatedAtFormat: momentFormat(itemData.updatedAt),
            }
            finalData.push(rawData)
        }
        return {
            data: finalData,
            totalPage: paginationOb.totalPage
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

export const actionService = async (data: actionDto, adminId: number) => {
    try {
        const agent = await Agents.findOne({
            where: {
                id: data.agentId,
            },
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['email'],
                }
            ]
        });

        if (!agent) {
            return false
        }

        if (data.status === "active") {
            await agent.update({
                status: data.status,
                acceptBy: adminId,
            })
            return true
        } else {
            await agent.update({
                status: data.status,
                bannedBy: adminId,
            })
            return true
        }
    } catch (error) {
        console.log(error);
        return false
    }
}