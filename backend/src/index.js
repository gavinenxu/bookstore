const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    books: (parent, args, context, info) => {
      return context.prisma.books();
    }
  },
  Mutation: {
    createBook(
      parent,
      {
        primary_isbn,
        title,
        authors,
        bookkey,
        isbns,
        price,
        amazon_rank,
        publisher,
        primary_bisacs,
        description,
        active,
        image
      },
      context,
      info
    ) {
      return context.prisma.createBook(
        {
          primary_isbn,
          title,
          authors,
          bookkey,
          isbns,
          price,
          amazon_rank,
          publisher,
          primary_bisacs,
          description,
          active,
          image
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
