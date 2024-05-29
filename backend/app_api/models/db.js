import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbURI = process.env.DATABASE_URL;

mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
    console.log(`${dbURI} adresindeki veritabanına bağlanıldı!\n`);
});

mongoose.connection.on("error", (err) => {
    console.log(`Bağlantı hatası! ${err}\n`);
});

mongoose.connection.on("disconnected", () => {
    console.log("Bağlantı kesildi!\n");
});

process.on("SIGINT", () => {
    mongoose.connection.close()
    console.log("Uygulama kapatıldı");
    process.exit(0);
});

import './product.js';
