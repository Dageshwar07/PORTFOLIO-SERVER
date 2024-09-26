export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: expires, // Correct Date object for cookie expiration
      httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
