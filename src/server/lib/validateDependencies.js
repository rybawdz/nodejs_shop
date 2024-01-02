const validateDependencies = () => {
  return new Promise((res, rej) => {
    let success = true
    if (!success) {
      logger.error(colors.red('Exiting due to unsatisfied dependencies!'))
      process.exit(1);
      rej();
    }
    res();
  });
};

module.exports = validateDependencies
