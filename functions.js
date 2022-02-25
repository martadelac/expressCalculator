function getMean(arr) {
  //get average number
  if (arr.length === 0) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  return mean;
}

function getMedian(arr) {
  //sorts and  gets middle number
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function frequencyCounter(arr) {
  //return object with element frequency
  const counts = {};
  arr.forEach((el) => {
    if (counts[el] === undefined) {
      counts[el] = 0;
    }
    counts[el] += 1;
  });
  return counts;
}

function getMode(arr) {
  //Get first most frequent  element

  let most;
  let count = 0;

  let freq_counter = frequencyCounter(arr);

  for (let key in freq_counter)
    if (freq_counter[key] > count) {
      most = key;
      count = freq_counter[key];
    }

  return Number(most);
}

function validateQuery(str) {
  const arr = [];

  try {
    const strArr = str.split(",");
    for (let i = 0; i < strArr.length; i++) {
      console.log(strArr[i]);
      let num = Number(strArr[i]);
      if (Number.isNaN(num)) {
        return new Error(`The value'${strArr[i]}' is not a number`);
      }
      arr.push(num);
    }
    return arr;
  } catch (e) {
    console.error(e.name + ":" + e.message);
  }
}

module.exports = {
  getMean,
  getMedian,
  getMode,
  frequencyCounter,
  validateQuery,
};
