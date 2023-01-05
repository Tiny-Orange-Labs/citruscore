import mongoose from 'mongoose';
// todo password, username
await mongoose.connect(`mongodb://${process.env.MONGO_URL}/log`);
mongoose.set('strictQuery', false);
mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', () => console.log('disconnected event triggered'));
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('disconnected through app termination');
        process.exit(0);
    });
});
