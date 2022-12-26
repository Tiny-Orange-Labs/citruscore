import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/log');

mongoose.set('strictQuery', false);
mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', () => console.log('disconnected event triggered'));
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('disconnected through app termination');
        process.exit(0);
    });
});
