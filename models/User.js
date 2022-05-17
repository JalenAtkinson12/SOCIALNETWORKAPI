const {Schema, model, models} = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: trim
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
   ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function(){
    return this.friend.length;
});

const User = model('User', UserSchema);

models.exports = User;