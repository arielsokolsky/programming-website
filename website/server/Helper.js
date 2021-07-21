
const crypto = require('crypto');

//the class is responsible for genrating the random cookie
class Helper
{
    // generate a random string 
    static genrateRandomString(length, charOptions)
    {
        let string = "";
        for (let index = 0; index < length; index++) 
        {   
            string += charOptions[this.randomInt(0, charOptions.length)];
        }
        return string;
    }
    // generate a random int between min and max (including min and max)
    static randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min) + min) + 1;
    }
    // hashes a string to hex
    static hash(toHash, algorithm = 'sha256', digest = 'hex')
    {
        return crypto.createHash(algorithm).update(toHash).digest(digest);
    }
    // saves log
    static log(string)
    {
        console.log(string);
    }
}

module.exports = Helper;