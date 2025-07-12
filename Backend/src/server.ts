import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'your-default-mongo-url';

let isConnected = false; 

async function main() {
if (isConnected) {
console.log('MongoDB is already connected.');
return;
}

try {
await mongoose.connect(MONGO_URL);
isConnected = true;
console.log('✅ Database Connected');
app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});
} catch (err) {
console.error("❌ Can't connect to Database", err);
}
}

main();