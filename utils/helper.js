const helperPost = async (res, message, code, flag) => {
  try {
    return res.status(code).json({
      message: message,
      flag: flag,
    });
  } catch (err) {
    console.log("Error at helper function" + err.message);
  }
};

const helperGet = async (res, result, code) => {
  try {
    return res.status(code).json(result);
  } catch (err) {
    console.log("Error at helper function" + err.message);
  }
};

module.exports = { helperPost, helperGet };
