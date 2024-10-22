const mongoose = require("mongoose"); // mongoose connects database with server

const connectDb = async () => { // ansyc- promise handling

    try{ //without try program abnorally terminate hojega ...

        const connect = await mongoose. //await-promise handling  ... promise- an object that will produce a single value some time in the future. 
        connect(process.env.CONNECTION_STRING); //connection fn mei connection string pass krte hai 
        console.log(
            "Database Connected; ",
            connect.connection.host,
            connect.connection.name
        );
    }
     catch(err)
     {
        console.log(err);
        process.exit(1); // 1 is fail and 0 is pass // why use exit()?- async call k  hold krk rkhtai to exit krdena chye time se
     }
};
module.exports = connectDb;