var mySql = {
  sick: {
    2: 'SELECT * FROM sick WHERE id=?',
    4: 'SELECT * FROM sick WHERE name=?',
    6: 'SELECT * FROM sick WHERE id=? AND name=?',
    8: 'SELECT * FROM sick WHERE card=?',
    10: 'SELECT * FROM sick WHERE id=? AND card=?',
    12: 'SELECT * FROM sick WHERE name=? AND card=?',
    14: 'SELECT * FROM sick WHERE id=? name=? AND card=?',
    16: 'SELECT * FROM sick WHERE iphone=?',
    18: 'SELECT * FROM sick WHERE id=? AND iphone=?',
    20: 'SELECT * FROM sick WHERE name=? AND iphone=?',
    22: 'SELECT * FROM sick WHERE id=? name=? AND iphone=?',
    24: 'SELECT * FROM sick WHERE card=? AND iphone=?',
    26: 'SELECT * FROM sick WHERE id=? card=? AND iphone=?',
    28: 'SELECT * FROM sick WHERE name=? card=? AND iphone=?',
    30: 'SELECT * FROM sick WHERE id=? name=? card=? AND iphone=?'

  }
}
module.exports = mySql;
