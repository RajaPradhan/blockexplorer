const path = require('path');
const fs = require('fs');

const eslintConfig = {
  extends: ['react-app'],
  plugins: ['graphql'],
  overrides: [],
};

if (process.env.NODE_ENV !== 'production') {
  const fileContent = fs
    .readFileSync(path.join(__dirname, '../backend/src/graphql/schema.ts'))
    .toString();

  const schemaString = fileContent.substring(
    fileContent.indexOf('`') + 1,
    fileContent.lastIndexOf('`'),
  );

  eslintConfig.overrides.push({
    files: ['./src/**/*.ts?(x)'],
    rules: {
      'graphql/template-strings': [
        'error',
        {
          schemaString,
        },
      ],
    },
  });
}

module.exports = eslintConfig;
