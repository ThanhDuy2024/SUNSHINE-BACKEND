import { updateAgent } from "../../dto/agents.dto";
import { Agents } from "../../Models/Agent.model";

export const getAgentService = async (userId: number) => {
    try {
        const agent = await Agents.findOne({
            where: {
                userId: userId,
            }
        });

        if(!agent) {
            return false
        };

        if(agent.dataValues.status === "banned") {
            return 'banned'
        }

        if(agent.dataValues.status === "inactive") {
            return 'inactive'
        }

        if(agent.dataValues.status === "delete") {
            return 'delete'
        }

        const data = agent.toJSON();
        return data;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const putAgentService = async (data: updateAgent, userId: number) => {
    try {
        const agent = await Agents.findOne({
            where: {
                userId: userId,
                status: 'active',
            }
        });

        if(!agent) {
            return false;
        };

        await agent.update({
            agentName: data.agentName,
            address: data.address,
            image: data.image
        })
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export const deleteAgentService = async (userId: number) => {
    try {
        const agent = await Agents.findOne({
            where: {
                userId: userId,
                status: "active"
            }
        });

        if(!agent) {
            return false
        }

        await agent.update({
            status: 'delete',
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}