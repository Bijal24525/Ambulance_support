const { Driver, Traffic, RouteInfo } = require('./../models');

module.exports = (force = false) => {
  Driver.sync({ force: force });
  Traffic.sync({ force: force });
  RouteInfo.sync({force: force});
};
