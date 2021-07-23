const Helper = require('../Helper.js');
const config = require('../Config.json');

// manages login logic and database queries
class LoginManager
{
    constructor (database)
    {
        this.database = database;
    }
    // method adds a user to the database
    addUser(name, password)
    {
        let hashedPassword = this.hash(password);
        this.database.run(`INSERT INTO Users VALUES (NULL, ?, ?, 0);`, [name, hashedPassword])
            .catch(Helper.log);
    }
    // method removes user from the database
    removeUser(name)
    {
        this.database.run(`DELETE FROM Users WHERE name = ?;`, [name])
            .catch(Helper.log);
    }
    // method check if a login info is valid. returns promise with user id or rejects if invalid.
    loginValid(name, password)
    {
        let hashedPassword = this.hash(password);
        const INCORRECT_USER = "incorrect username", INCORRECT_PASSWORD = "incorrect password";
        return this.database.select(`SELECT password, id FROM Users WHERE name = ?;`, [name])
            .then(
                data =>
                {
                    // check if exactly one user was found
                    if (data.length === 0)
                        throw new Error(INCORRECT_USER);
                    else if (data.length === 1)
                        data = data[0];
                    else throw new Error("two users with the same name in the database");
                    // compare passwords to check validity
                    if (hashedPassword === data.password)
                        return data.id;
                    else
                        throw new Error(INCORRECT_PASSWORD);
                }
            )
            .catch(
                error =>
                {
                    if (error.message !== INCORRECT_USER && error.message !== INCORRECT_PASSWORD)
                    {
                        Helper.log(error);
                        throw new Error("server error");
                    }
                    else
                        throw error;
                }
            );
    }
    // method checks if a user exists in the database. returns a promise with result (true / false).
    async userExists(name)
    {
        let count = await this.database.get(`SELECT COUNT(*) FROM Users WHERE name = ?;`, [name]);
        return count === 1;
    }
    // hashes password with salt
    hash(password)
    {
        return Helper.hash(password + config.PASSWORD_SALT);
    }
}

module.exports = LoginManager;
