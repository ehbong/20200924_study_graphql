/** @format */

const fakeDatabase = require("../testData/testData");
const Graphql = require("graphql");
var { makeExecutableSchema } = require("graphql-tools");

const typeDefs = `
type geo{
  lat:Float,
  lng:Float
}
type company{
  name:String
  catchPhrase:String
  bs:String
}
type address{
  street:String
  suite:String
  city:String
  zipcode:String
  geo:geo
}
type user{
  id:Int
  name:String
  username:String
  email:String
  address:address
  phone:String
  website:String
  company:company
}
type Query{
  user(id:Int!):user
  allUser:[user]
}
`;
const resolvers = {
  Query: {
    user(_, { id }) {
      const data = Object.keys(fakeDatabase).filter((element) => {
        if (fakeDatabase[element].id == id) {
          return element;
        }
      });
      return fakeDatabase[data];
    },
    allUser() {
      return fakeDatabase;
    },
  },
};

var schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
