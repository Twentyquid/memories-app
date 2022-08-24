import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const privateKey = process.env.JWT_PRIVATE_KEY;
export const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  let authToken;
  if (authHeader) {
    authToken = req.headers.authorization.split(" ")[1];
  } else {
    authToken = "";
  }
  // console.log("Authtoken received is: ", authToken);
  jwt.verify(authToken, privateKey, function (err, decoded) {
    if (err) {
      err.status = 404;
      // console.log(err);
      next(err);
    } else {
      next();
    }
  });
};
