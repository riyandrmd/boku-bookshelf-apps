import conn from "./connection.js";
import bcrypt from "bcrypt";

export const validate = async (decoded, request, h) => {
try{
    console.log(" - - decoded token:");
    console.log(decoded);

    const user = await conn.query("SELECT * FROM users WHERE email = ?", [decoded.email]);

    if (user.length > 0) {
        const hashedPasswordFromDB = user[0].password;
        const passwordMatch = bcrypt.compare(
            decoded.password,
            hashedPasswordFromDB
        );

        if (passwordMatch) {
            return { isValid: true };
        } else {
            return { isValid: false };
        }
    }
}catch(error){
    console.error(error)
    return{
        message : "error validating"
    }
}

};
