/* eslint-disable global-require,import/no-dynamic-require */
const _ = require("lodash");
const fs = require("fs");
const path = require("path");

const dotifyStructure = structure => {
  const paths = {};
  _.forEach(structure, (subStructure, topLevel) => {
    _.forEach(subStructure, (functionCode, subLevel) => {
      paths[`${topLevel}.${subLevel}`] = functionCode;
    });
  });

  return paths;
};

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      // eslint-disable-next-line no-param-reassign
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });

  return filelist;
};

const getControllerExports = startDir => {
  const controllerExports = {};
  const versionName = path.parse(startDir).name;
  _.forEach(walkSync(startDir), definition => {
    const definitionName = definition
      .replace(startDir, "")
      .replace(/\//g, ".")
      .replace(versionName, "")
      .replace(/^\.+/, "")
      .replace(/.js$/, "");

    controllerExports[definitionName] = require(definition);
  });

  return controllerExports;
};

/* istanbul ignore next */
/* we can ignore it because if it's broken, no tests will work as this is the base export functionality */
const getSwaggerExports = startDir => {
  const swaggerExports = {};
  _.forEach(walkSync(startDir), definition => {
    const definitionName = definition
      .replace(startDir, "")
      .replace(/^./, "")
      .replace(/\//g, ".")
      .replace(/.js$/, "");
    if (definitionName !== "index")
      swaggerExports[definitionName] = require(definition);
  });

  return swaggerExports;
};

/* istanbul ignore next */
/* we can ignore it because if it's broken, no tests will work as this is the base export functionality */
const exportVersionStructure = folder => {
  // find every vxx folder and dotify its structure
  const vExports = {};
  fs.readdirSync(folder).forEach(file => {
    const fullPath = path.join(folder, file);
    if (fs.statSync(fullPath).isDirectory() && file.match(/^v\d+$/)) {
      vExports[file] = getSwaggerExports(fullPath);
    }
  });

  return dotifyStructure(vExports);
};

module.exports = {
  dotifyStructure,
  exportVersionStructure,
  getControllerExports,
  walkSync
};
