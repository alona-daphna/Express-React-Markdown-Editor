import { buildSchema } from 'graphql';

const getFileByID = (id) => {
  return { name: 'untitled' + id, content: 'some content' };
};

const getAllFiles = () => {
  return [{ name: 'untitled', content: 'some content' }];
};

export const schema = buildSchema(`
    type Query {
        file(id: ID!): File,
        files: [File]
    }

    type File {
        name: String,
        content: String
    }
`);

export const root = {
  file: (args) => getFileByID(args.id),
  files: () => getAllFiles(),
};
