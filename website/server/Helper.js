
//the class is responsible for genrating the random cookie
class Helper
{
    //genrate a random string 
    static genrateRandomString(length, charOptions)
    {
        let string = "";
        for (let index = 0; index < length; index++) 
        {   
            string += charOptions[this.randomInt(0, charOptions.length)];
        }
        return string;
    }
    static randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min) + min) + 1;
    }
}

module.exports = Helper;