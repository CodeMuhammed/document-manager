import Sequelize from 'sequelize';
import fs from 'fs-extra';
import sorter from './modelSorter';
import models from '../models';
import * as Config from '../config.json';

const config = Config[(process.env.NODE_ENV || 'development')];

const baseDir = `${__dirname}/../migrations`;
let sequelize;
let timeDiff = 0;

// Setup sequelize database
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Delete default models setup.
delete models.default;

// Reset the migrations folder
fs.removeSync(baseDir);
fs.mkdirsSync(baseDir);

// Walk through the models and create the migration files for each one
for (const model of sorter.sort(models)) {
  const attributes = models[model].attributes;

  for (const column in attributes) {
    delete attributes[column].Model;
    delete attributes[column].fieldName;
    delete attributes[column].field;

    for (const property in attributes[column]) {
      if (property.startsWith('_')) {
        delete attributes[column][property];
      }
    }

    if (typeof attributes[column].type !== 'undefined') {
      if (typeof attributes[column].type.options !== 'undefined'
          && typeof attributes[column].type.options.toString === 'function') {
        attributes[column].type.options = attributes[column].type.options.toString(sequelize);
      }

      if (typeof attributes[column].type.toString === 'function') {
        attributes[column].type = attributes[column].type.toString(sequelize);
      }
    }
  }

  const schema = JSON.stringify(attributes, null, 4);
  const tableName = models[model].tableName;
  const indexes = ['\n'];

  if (models[model].options.indexes && models[model].options.indexes.length) {
    models[model].options.indexes.forEach((obj) => {
      indexes.push('        .then(() => {');
      indexes.push('            return queryInterface.addIndex(');
      indexes.push(`                '${tableName}',`);
      indexes.push(`                ['${obj.fields.join("','")}']`);

      const opts = {};
      if (obj.name) {
        opts.indexName = obj.name;
      }
      if (obj.unique === true) {
        opts.indicesType = 'UNIQUE';
      }
      if (obj.method === true) {
        opts.indexType = obj.method;
      }
      if (Object.keys(opts).length) {
        indexes.push(`                , ${JSON.stringify(opts)}`);
      }
      indexes.push('            )');
      indexes.push('        })');
    });
  }

  const template = `module.exports = {
        up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('${tableName}',${schema})${indexes.join('\n')};
        },
        down: function(queryInterface, Sequelize) {
            return queryInterface.dropTable('${tableName}');
        }
    };`;

  if (models[model].tableName) {
    const d = new Date();
    const filename = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds() + (timeDiff += 1)}-${models[model].tableName}`;
    fs.writeFileSync(`${baseDir}/${filename}.js`, template);
    console.log(`Migrations for ${models[model].tableName} generated`);
  }
}
