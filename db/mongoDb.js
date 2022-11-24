import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ecommerce",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const dbName = await connection.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  } catch (err) {
    console.log("Error connecting to mongo: ", err);
    process.exit(1);
  }
};

export default connectDatabase;
