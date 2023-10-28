import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { root, schema } from './utils/graphql.js';
import { graphqlHTTP } from 'express-graphql';
import fileRouter from './routes/fileRoutes.js';
import { basicAuthMiddleware } from './utils/basicAuth.js';

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
};

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.use('/files', basicAuthMiddleware, fileRouter);

app.listen(PORT, () => {
  console.log('REST server running on port ' + PORT);
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
