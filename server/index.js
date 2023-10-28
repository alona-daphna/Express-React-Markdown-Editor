import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { root, schema } from './utils/graphql.js';
import { graphqlHTTP } from 'express-graphql';
import fileRouter from './routes/fileRoutes.js';
import { generateAccessToken, authMiddleware } from './utils/auth.js';

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
};

const app = express();
const PORT = process.env.PORT || 4000;

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
app.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.PASSWORD) {
    res.json({ token: generateAccessToken() });
  } else {
    res.status(401).send('unauthorized');
  }
});

app.listen(PORT, () => {
  console.log('REST server running on port ' + PORT);
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
