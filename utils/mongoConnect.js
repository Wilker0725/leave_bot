import mongoose from "mongoose"

let connection = {}

const mongoConnect = async () => {
  console.log("connection: ", connection)
  if (connection.isConnected) return

  const db = await mongoose.connect(process.env.MONGO_URI)
  connection.isConnected = db.connections[0].readyState
}

export default mongoConnect
