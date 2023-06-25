const { exec } = require("child_process");

module.exports.execAsync = async function execAsync(command) {
  return new Promise((resolve) => {
    exec(command, () => {
      resolve(null);
    });
  });
};

// create a function delay(ms) to simulate a delay
module.exports.delay = function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
