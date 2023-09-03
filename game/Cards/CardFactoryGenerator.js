const fs = require('fs');
const path = require('path');

// Path to the 'Cards' folder
const cardsFolderPath = __dirname;

// Initialize the content of the TypeScript file
let tsFileContent = '';

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Read all subfolders in the 'Cards' folder
const cardFolders = fs.readdirSync(cardsFolderPath).filter((folder) => {
  return fs.statSync(path.join(cardsFolderPath, folder)).isDirectory();
});

// Import statements for each card class
const imports = cardFolders.map((folder) => {
  const className = `Card${capitalizeFirstLetter(folder)}`;
  return `import { ${className} } from './${folder}/${className}';`;
}).join('\n');

// Mapping of card IDs to card classes
const mapping = cardFolders.map((folder) => {
  const className = `Card${capitalizeFirstLetter(folder)}`;
  return `  ${capitalizeFirstLetter(folder)}: ${className},`;
}).join('\n');

// Add imports to the TypeScript file content
tsFileContent += `${imports}\n`;

// Add the static mapping and the factory function
tsFileContent += `
import { CardWrapper } from './CardWrapper';

const cardMapping = {
${mapping}
} as const;

export type CardId = keyof typeof cardMapping;

export function createCard(cardId: CardId) {
  const CardClass = cardMapping[cardId];
  if (CardClass) {
    return new CardWrapper(new CardClass());
  }
  return null;
}
`;

// Write the TypeScript file
fs.writeFileSync(path.join(cardsFolderPath, 'CardFactory.ts'), tsFileContent);

console.log('CardFactory.ts has been generated.');
