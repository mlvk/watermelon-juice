const round = (number, precision = 2) => {
  const shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };

  return shift(Math.round(shift(number, precision, false)), precision, true);
}

export {
  round
}
