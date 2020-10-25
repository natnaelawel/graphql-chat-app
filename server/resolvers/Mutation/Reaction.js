require("dotenv").config();
const { Op } = require("sequelize");
const { UserInputError, PubSub, AuthenticationError, ForbiddenError } = require("apollo-server");
const { User, Message, Reaction } = require("../../models");

const reactions = require('../../utils/reactions')
const reactToMessage = async (_, {uuid, content}, {user, pubsub}, info)=>{
    console.log('reaction is started....')
    try {
        if(!reactions.includes(content)){
            throw new UserInputError('Invalid reaction')
        }
        // get user
        const username = user ? user.username : ""
        user = await User.findOne({where: {username}})
        if(!user) throw new AuthenticationError('UnAuthenticated')
        
        //get Message
        const message = await Message.findOne({where:{uuid}})
        if(!message)throw new UserInputError('Message not Found')
        
        if(message.from !== user.username && message.to !== user.username){
            throw new ForbiddenError('UnAuthorized')
        }
        
        let reaction = await Reaction.findOne({
            where: {messageId: message.id, userId: user.id}
        })
        console.log('in reaction:reaction is ', reaction)
        if(reaction){
            // if reaction exists update it 
            reaction.content = content 
            await reaction.save()
        }else{
            // if reaction doesn't exists create it  
            reaction = await Reaction.create({
                messageId: message.id,
                userId: user.id,
                content
            })
        }
        pubsub.publish("NEW_REACTION", { newReaction: reaction });

        return reaction
    } catch (error) {
        
    }
}

module.exports = {
    reactToMessage
}