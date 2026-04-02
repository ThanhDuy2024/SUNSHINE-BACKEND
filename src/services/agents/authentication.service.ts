import { RegisterDto } from "../../dto/agents.dto";
import { Agents } from "../../Models/Agent.model";

export const registerService = async (data: RegisterDto, userId: number) => {
    try {
        const agentAccount = await Agents.findOne({
            where: {
                userId: userId,
            }
        });

        if(agentAccount) {
            return false
        };

        await Agents.create({
            agentName: data.agentName,
            address: data.address,
            image: data.image,
            userId: userId,
        })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}