
import bcrypt from "bcrypt";

// 1) make our password hashed
export const hashPassword = async (password) => {
  try {

    // higher the saltRounds slower will be the cpu used
    // saltRounds make the password more strong and increase length of password 
    // and if length of password more long then cpu will take more time to decode the hash value
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    alert(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};