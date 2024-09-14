const wines = require("./wineData");
const critics = require("./criticData");

function findDuplicates(arr) {
  const duplicates = [];
  const seen = new Set();

  arr.forEach((item) => {
    const identifier = `${item.name}-${item.year}`;
    if (seen.has(identifier)) {
      duplicates.push(item);
    } else {
      seen.add(identifier);
    }
  });

  console.log(duplicates);
  console.log(duplicates.length);
  return duplicates;
}

findDuplicates(critics);
