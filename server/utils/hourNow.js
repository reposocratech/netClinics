const hourNow = (hour) => {
  let hourNowId = 0;

  switch (hour) {
    case 8:
      hourNowId = 1;
      break;
    case 9:
      hourNowId = 2;
      break;
    case 10:
      hourNowId = 3;
      break;
    case 11:
      hourNowId = 4;
      break;
    case 12:
      hourNowId = 5;
      break;
    case 13:
      hourNowId = 6;
      break;
    case 14:
      hourNowId = 7;
      break;
    case 15:
      hourNowId = 8;
      break;
    case 16:
      hourNowId = 9;
      break;
    case 17:
      hourNowId = 10;
      break;
    case 18:
      hourNowId = 11;
      break;
    case 19:
      hourNowId = 12;
      break;
    case 20:
      hourNowId = 13;
      break;
    case 21:
      hourNowId = 14;
      break;
  }

  return hourNowId;
};

module.exports = { hourNow };
