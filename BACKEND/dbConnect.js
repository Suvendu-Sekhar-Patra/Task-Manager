const mongoose=require("mongoose");

async function connectToMongoDB(url) {
    if (!url) {
        throw new Error("MongoDB connection URL is missing");
    }
    return mongoose.connect(url);
}

module.exports={
    connectToMongoDB
}