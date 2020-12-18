import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema.js";
import cors from "cors";
const app = express();
const PORT = 8080;

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log("Server started on " + PORT));
