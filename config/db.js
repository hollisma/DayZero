const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    // Connect to MongoDB database with mongoose
    // Flags are to resolve deprecation warnings
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } catch (err) {
    console.error(err.message)

    // Exit with exit failure
    process.exit(1)
  }
}

module.exports = connectDB