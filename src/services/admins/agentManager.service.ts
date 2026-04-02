import { actionDto } from "../../dto/agents.dto";
import { momentFormat } from "../../helpers/moment.helper";
import { Agents } from "../../Models/Agent.model";
import { Users } from "../../Models/Users.model";
export const getAllAgentService = async () => {
    try {
        const data = await Agents.findAll({
            nest: true,
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                }
            ]
        })
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
        return finalData
    } catch (error) {
        console.log(error);
        return false
    }
}

export const actionService = async (data: actionDto, adminId: number) => {
    try {
        console.log(data);
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