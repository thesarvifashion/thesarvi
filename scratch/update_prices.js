const fs = require('fs');

const filePath = 'assets/js/products.js';
let content = fs.readFileSync(filePath, 'utf8');

// Match `price: <number>` inside the array definition
const updatedContent = content.replace(/(id:\s*"TS-\d+"[\s\S]*?price:\s*)(\d+)/g, (match, prefix, priceStr) => {
    const oldPriceNum = parseInt(priceStr, 10);
    const newPriceNum = oldPriceNum + 30;
    return prefix + newPriceNum;
});

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated all 28 product prices by +30!');
