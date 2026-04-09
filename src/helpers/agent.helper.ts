import { Agents } from "../Models/Agent.model"

export const agentCheck = async (userId: number) => {
  try {
    const agent = await Agents.findOne({
      where: {
        userId: userId
      }
    });

    if(!agent) {
      return false
    };
    return agent.dataValues
  } catch (error) {
    console.log(error)
    return false
  }
}