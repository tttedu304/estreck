import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        // eslint-disable-next-line no-control-regex
        match: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        required: true,
        unique: true
    },
    username: {
        type: String,
        minLength: 3,
        maxLength: 32,
        match: /^[A-Za-z0-9_-]+$/,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true
    }
});

const codeSchema = new Schema({
    title: {
        type: String,
        minLength: 4,
        required: true,
        maxLength: 255
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    language: {
        type: String,
        lowercase: true,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    isValidated: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, matched) => {
            if (err) return reject(err);
            resolve(matched);
        });
    });
};

export default () => {
    connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('MongoDB Ready!');
    });

    return (req, res, next) => {
        req.db = {
            users: model('Users', userSchema),
            codes: model('Codes', codeSchema)
        };

        next();
    };
};