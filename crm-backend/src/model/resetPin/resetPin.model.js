const { ResetPinSchema } = require("./resetPin.schema");
const { randomPinNumber } = require("../../utils/randomGenerator");

const setPasswordResetPin = async (email) => {
  //create random 6 digit number
  // const randomPin = 747384;
  const pinLength = 6;
  const randomPin = await randomPinNumber(pinLength);

  const resetObj = {
    email,
    pin: randomPin,
  };
  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getPinByEmailPin = (email, pin) => {
  return new Promise((resolve, reject) => {
    try {
      ResetPinSchema.findOne({ email, pin }, (error, data) => {
        if (error) {
          console.log(error);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

const deletePin = (email, pin) => {
  try {
    ResetPinSchema.findByIdAndDelete({ email, pin }, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setPasswordResetPin,
  getPinByEmailPin,
  deletePin,
};
