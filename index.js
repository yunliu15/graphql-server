import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js";
import db from './_db.js';

// resolvers
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        game(_, args) {
            return db.games.find(g => g.id === args.id)
        },
        review(_, args) {
            return db.reviews.find(r => r.id === args.id)
        },
        author(_, args) {
            return db.authors.find(a => a.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(r => r.game_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find(g => g.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(r => r.author_id === parent.id)
        }
    }
}

//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log('Server ready at port ', 4000)