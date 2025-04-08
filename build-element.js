const fs = require('fs-extra');
const concat = require('concat');

const projectName = 'ng16-webcomponent'; // Match your project name in angular.json
const distFolder = `./dist/${projectName}`;
const outputFolder = './dist/element'; // Where the final single file will go
const outputFile = `${outputFolder}/my-angular-element.js`;

async function buildElement() {
  console.log(`Building Angular element: ${projectName}...`);

  // --- Build Angular Project ---
  console.log('Running Angular build (clearing cache)...');
  const ngBuild = require('child_process').execSync(
    // Add --delete-output-path to ensure clean build target
    `ng build --configuration production --output-path ${distFolder} --delete-output-path`
  );
  console.log(ngBuild.toString());
  console.log('Angular build complete.');

  // --- Concatenate Files ---
  console.log(`Concatenating files into ${outputFile}...`);

  const files = [
    `${distFolder}/runtime.js`,
    `${distFolder}/polyfills.js`,
    `${distFolder}/main.js`,
  ];

  // Ensure output directory exists
  await fs.ensureDir(outputFolder);

  // Concatenate the files
  await concat(files, outputFile);
  console.log('Files concatenated successfully.');

  // --- Optional: Copy Assets (if needed) ---
  // if (fs.existsSync(`${distFolder}/assets`)) {
  //   console.log(`Copying assets...`);
  //   await fs.copy(`${distFolder}/assets`, `${outputFolder}/assets`);
  //   console.log('Assets copied.');
  // }

  console.log(`Angular element build finished: ${outputFile}`);
}

buildElement().catch(err => {
  console.error("Element build failed:", err);
  process.exit(1);
}); 