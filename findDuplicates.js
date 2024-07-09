const wines = require('./wineData')

function findDuplicates(wines) {
    const duplicates = [];
    const seen = new Set();
  
    wines.forEach(wine => {
      const identifier = `${wine.name}-${wine.year}`;
      if (seen.has(identifier)) {
        duplicates.push(wine);
      } else {
        seen.add(identifier);
      }
    });
  
    console.log(duplicates);
    console.log(duplicates.length);
    return duplicates;
  }

  
  findDuplicates(wines);