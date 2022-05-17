const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 200
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm: a')
    },

},
{
    toJSON: {
        getters: true
    }
});

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 1
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = await model('Thought', ThoughtSchema);

module.exports = Thought;