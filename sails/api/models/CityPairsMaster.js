/**
 * CityPairsMaster.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
tableName: 'cityPairsMaster',
  
attributes: {
    ID : { type: 'integer' },
    ITEM_NUM : { type: 'string' },
    AWARD_YEAR : { type: 'string' },
    ORIGIN_AIRPORT_ABBREV : { type: 'string' },
    DESTINATION_AIRPORT_ABBREV : { type: 'string' },
    ORIGIN_CITY_NAME : { type: 'string' },
    ORIGIN_STATE : { type: 'string' },
    ORIGIN_COUNTRY : { type: 'string' }, 
    DESTINATION_CITY_NAME : { type: 'string'},
    DESTINATION_STATE : { type: 'string'},
    DESTINATION_COUNTRY	: { type: 'string'},
    AIRLINE_ABBREV : { type: 'string' },
    AWARDED_SERV : { type: 'string' },
    PAX_COUNT : { type: 'string' },
    YCA_FARE : { type: 'integer'},
    XCA_FARE : { type: 'integer'},
    BUSINESS_FARE : { type: 'integer'},
    ORIGIN_AIRPORT_LOCATION : { type: 'string'},
    DESTINATION_AIRPORT_LOCATION : { type: 'string'},
    ORIGIN_CITY_STATE_AIRPORT : { type: 'string'},
    DESTINATION_CITY_STATE_AIRPORT : { type: 'string'},
    EFFECTIVE_DATE : { type: 'date' },
    EXPIRATION_DATE : { type: 'date' }
  }
};

