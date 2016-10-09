const tokenStrings = [
  '1eVf0OVl72ALeT5a',
  'SH9ITJcCzYQelxBg',
  'pRkvnCZy1EDXWM5p',
  'pBvLdkEDQhGy5QiJ',
  'xLybjAOsxw6p9RNH',
  'gwESHjpbiHwbcDvw',
  'G0JoQ1wABZmI7tb3',
  'TRKjH0nwvU2nMvVG',
  'YxbLUOCX1avGkjr2',
  'nBN443g4JlBGZH6G'
];

const tokens = [];

function createToken() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  const tokenIndex = getRandomInt(0, tokenStrings.length);

  return {
    token: tokenStrings[tokenIndex],
    expDate: (new Date()).toJSON()
  };
};

module.exports = function(server) {
  tokens.push(createToken());

  server.get('/admin/tokens', function(req, res) {
    res.json(tokens);
  });

  server.post('/admin/tokens', function(req, res) {
    tokens.push(createToken());

    res.json({});
  });
};
