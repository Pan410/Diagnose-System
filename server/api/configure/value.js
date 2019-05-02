// var $params = require('../sickApi');
var value = {
  sick: {
    2: '[params.id]',
    4: '[params.name]',
    6: '[params.id,params.name]',
    8: '[params.card]',
    10: '[params.id, params.card]',
    12: '[params.name, params.card]',
    14: '[params.id, params.name, params.card]',
    16: '[params.iphone]',
    18: '[params.id, params.iphone]',
    20: '[params.name, params.iphone]',
    22: '[params.id, params.name, params.iphone]',
    24: '[params.card, params.iphone]',
    26: '[params.id, params.card, params.iphone]',
    28: '[params.name, params.card, params.iphone]',
    30: '[params.id, params.name, params.card, params.iphone]'

  }
}
module.exports = value;
