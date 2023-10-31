import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { root, schema } from './utils/graphql.js';
import { graphqlHTTP } from 'express-graphql';
import fileRouter from './routes/fileRoutes.js';
import authRouter from './routes/authRoutes.js';
import { authMiddleware } from './utils/auth.js';

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
};

const app = express();
const PORT = process.env.PORT || 4000;
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}/`;

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.use('/files', authMiddleware, fileRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log('REST server running on port ' + PORT);
  console.log(`GraphQL server running at ${BASE_URL}/graphql`);
});
