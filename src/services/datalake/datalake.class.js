const { BadRequest } = require('@feathersjs/errors');
const { Service } = require('feathers-sequelize');
const logger = require("../../logger");

exports.Datalake = class Datalake extends Service {
  async create(data, params) {
    const { query } = params;

    if (typeof query === "undefined") throw new BadRequest("`query` does not exist. (required)");

    if (typeof query["deviceId"] === "undefined") throw new BadRequest("Device ID not found.");

    return super.create({
      ...data,
      deviceId: query.deviceId
    }, params);
  }
};
