const { BadRequest } = require('@feathersjs/errors');
const { Service } = require('feathers-sequelize');
const moment = require('moment');
const logger = require('../../logger');

exports.Datalake = class Datalake extends Service {
  async create(data, params) {
    const { query } = params;

    if (typeof query === 'undefined') throw new BadRequest('`query` does not exist. (required)');

    if (typeof query['deviceId'] === 'undefined') throw new BadRequest('Device ID not found.');

    const now = moment().startOf("minutes");
    const reminder = 5 - (now.get('minute') % 5);
    const round = moment(now)
      .add(reminder, 'minutes')
      .subtract(5, 'minutes')
      ;

    let { data: lastData } = await this.find({
      query: {
        $limit: 1,
        deviceId: query.deviceId,
        createdAt: {
          $gte: round.toISOString()
        },
        $sort: { createdAt: -1 }
      }
    });

    lastData = lastData[0];

    if (lastData) {
      let patchData = {};
      Object.keys(data).forEach(key => {
        try {
          patchData[key] = (Number(data[key]) + Number(lastData[key])) / 2;
        } catch (err) {
          logger.error(err);
        }
      });
      return this.patch(lastData.id, patchData);
    }

    data.createdAt = round.toISOString();

    return super.create({
      ...data,
      deviceId: query.deviceId
    }, params);
  }
};
