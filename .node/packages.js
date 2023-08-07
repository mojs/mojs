const { exec, execSync } = require('child_process');

// check for package dependency updates
exec('npm outdate --json', (error, stdout, stderr) => {
  let json = JSON.parse(stdout);

  // loop through each outdated package dependency
  Object.entries(json).forEach(([name, version]) => {

     // check if there is a new package version and prevent regression
    if (version.wanted > version.current) {
      console.log(`Updating ${name} ${version.current} -> ${version.wanted}`);

      // install package wanted version
      execSync(`npm i ${name}@${version.wanted}`);

      // stage package files
      execSync('git add package.json package-lock.json');

      // commit changes
      execSync(`git commit -S -m "Update ${name} to ${version.wanted}"`);
    }
  });

  // push changes to the repository
  execSync('git push');
});