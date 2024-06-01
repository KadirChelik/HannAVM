import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const addressSchema = new Schema({
    title: String,
    address: String
});

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    token: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    TCno: {
        type: Number,
        unique: true,
        minlength: 11,
        maxlength: 11
    },
    phone: {type: Number},
    addresses: [addressSchema]
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.checkPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
};


userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            surname: this.surname,
            role: this.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const User = mongoose.model("user", userSchema, "users");

export default User;
