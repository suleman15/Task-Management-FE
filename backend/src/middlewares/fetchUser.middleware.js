import { JWT_SECRET } from "../config/envManager.js";
import { verifyJWT } from "../helpers/generateJwt.js";
import { ApiError } from "../utils/Error.js";

const fetchUser = async (req, res, next) => {
  // ... existing code for authorization header checks and token validation ...

  try {
    const tokenData = await verifyJWT(token);
    req.user = tokenData;

    // **Fetch user based on token data (ID or email):**
    const { userId, email } = tokenData; // Assuming token contains userId or email
    let user;

    if (userId) {
      user = await getUserById(userId);
    } else if (email) {
      user = await getUserByEmail(email);
    } else {
      throw new ApiError(404, "Missing User Information in Token");
    }

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    // Attach the fetched user to the request object
    req.user = user;
    next();
  } catch (error) {
    // Handle JWT verification errors and user fetching errors
    throw new ApiError(error.status || 401, error.message);
  }
};

export { fetchUser };
