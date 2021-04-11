import { gql } from 'apollo-server-express';


export const typeDefs = gql`

    scalar Date

    type User {
        _id: ID!
        email: String!
        username: String!
    }

    type Code {
        _id: ID!
        title: String!
        description: String!
        content: String!
        createdAt: Date!
        language: String!
        author: User!
        isValidated: Boolean!
    }

    input CodeInput {
        title: String!
        description: String!
        content: String!
        language: String!
    }

    type Query {
        user: User!
        hello: String!
        codes(isValidated: Boolean!): [Code!]!
    }

    type Mutation {
        login(username: String!, password: String!): User!
        signup(email: String!, username: String!, password: String!): User!
        addCode(input: CodeInput!): Code!
    }
`;

export const resolvers = {
    Query: {
        hello() {
            return 'Hello World from GraphQL';
        },
        user(_, __, { req }) {
            if (!req.session.user) throw new Error('Not logged in');
            return req.session.user;
        },
        async codes(_, { isValidated }, { req }) {

            const codesFound = await req.db.codes.find({ isValidated }).populate('author').exec();
            return codesFound;
        }
    },
    Mutation: {
        async login(_, { username, password }, { req }) {
            if (req.session.user) throw new Error('Already logged in');
            const user = await req.db.users.findOne({ username });
            if (!user) throw new Error('Invalid username');
            if (!(await user.comparePassword(password))) throw new Error('Invalid password');

            req.session.user = {
                email: user.email,
                username,
                _id: user._id
            };
            return req.session.user;
        },
        async signup(_, { email, username, password }, { req }) {
            if (!username.match(/^[A-Za-z0-9_-]+$/)) throw new Error('The username can only have the format from A-Z, 0-9, - and _.');
            // eslint-disable-next-line no-control-regex
            if (!email.match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/))
                throw new Error('The email should be valid');
            if (password.length < 8 || password.length > 100)
                throw new Error('Password minimum length is 8 and maximum 100');
            if (req.session.user) throw new Error('Already logged in');
            const userEmail = await req.db.users.findOne({ email });
            let user = await req.db.users.findOne({ username });
            if (user) throw new Error('That username is already in use');
            if (userEmail) throw new Error('That email is already in use');
            user = new req.db.users({
                email,
                username,
                password
            });
            await user.save();

            req.session.user = {
                email,
                username,
                _id: user._id
            };
            return req.session.user;
        },
        async addCode(_, { input }, { req }) {
            if (!req.session.user) throw new Error('You have to be logged to add a code.');
            const createdCode = await req.db.codes.create({ ...input, author: req.session.user._id });
            return createdCode;
        }
    }
};