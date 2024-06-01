import passport from "passport";
import User from "../models/user.js"; // User modelini import ettik

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

export const signUp = async function (req, res) {
    try {
        if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
            createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
            return;
        }

        const user = new User();
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.role = req.body.role || "user";

        await user.save().then((newUser) => {
            createResponse(res, 201, { id: newUser._id, name: newUser.name, surname: newUser.surname, email: newUser.email,role: newUser.role});
        });
    } catch (error) {
        console.error(error);
        createResponse(res, 400, { status: "Kayıt Başarısız!" });
    }
};

export const login = async function (req, res) {

    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
        return;
    }

    passport.authenticate("local", (currentUser) => {
        if (currentUser) {
            let generateToken = currentUser.generateToken();
            createResponse(res, 200, { token: generateToken,name: currentUser.name,email:currentUser.email,role: currentUser.role});
        } else {
            createResponse(res, 400, { status: "Kullanıcı adı ya da şifre hatalı" });
        }
    })(req, res);
};

export const getUser = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-hash -salt');
        if (!user) {
            return createResponse(res, 404, { status: "Kullanıcı bulunamadı" });
        }
        createResponse(res, 200, user);
    } catch (error) {
        console.error(error);
        createResponse(res, 500, { status: "Sunucu hatası" });
    }
};


export const listUsers = async function (req, res) {
    try {
        const users = await User.find({}).select('-hash -salt');
        createResponse(res, 200, users);
    } catch (error) {
        console.error(error);
        createResponse(res, 500, { status: "Sunucu hatası" });
    }
};

export const updateUser = async function (req, res) {
    try {
        const updatedData = req.body.password
            ? { ...req.body, hash: undefined, salt: undefined }
            : req.body;
        
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, updatedData, { new: true }).select('-hash -salt');
        createResponse(res, 200, updatedUser);
    } catch (error) {
        console.error(error);
        createResponse(res, 500, { status: "Sunucu hatası" });
    }
};

export const deleteUser = async function (req, res) {
    try {
        await User.findByIdAndDelete(req.params.userId);
        createResponse(res, 200, { status: "Kullanıcı başarıyla silindi" });
    } catch (error) {
        console.error(error);
        createResponse(res, 500, { status: "Sunucu hatası" });
    }
};

export const changePassword = async function (req, res) {
    try {
        const { id, oldPassword, newPassword } = req.body;

        if (!id || !oldPassword || !newPassword) {
            createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
            return;
        }

        const user = await User.findById(id);

        if (!user) {
            createResponse(res, 404, { status: "Kullanıcı bulunamadı" });
            return;
        }

        // Şifreyi kontrol etmek için validPassword fonksiyonunu kullan
        if (!user.validPassword(oldPassword)) {
            createResponse(res, 400, { status: "Eski şifre hatalı!" });
            return;
        }

        // Yeni şifreyi ayarla ve kullanıcıyı kaydet
        user.setPassword(newPassword);
        await user.save();

        createResponse(res, 200, { status: "Şifre başarıyla değiştirildi" });
    } catch (error) {
        console.error(error);
        createResponse(res, 500, { status: "Sunucu hatası" });
    }
};
