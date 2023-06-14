const jwt = require('jsonwebtoken');
const tokenHelper = require('../Helpers/Token');
const { User, admin, seller } = require("../Models");
const { AuthError } = require('../Errors')

exports.requireSignin = async (req, res, next) => {
    try {
        // console.log('user auth')
        const decodedToken = await getDecodedToken(req.get('Authorization'));
         console.log(decodedToken)
        if (decodedToken.scope !== 'login') {
            throw new AuthError('invalid auth token provided');
        }
        const user = await getUser(decodedToken.id);
        // console.log(user);
        if (!user) {
            throw new AuthError('invalid auth token provided');
        }
        // console.log(`user name ${user.name}`)
        req.user = user;
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

exports.adminMiddleware = async (req, res, next) => {
    try {
        console.log('admin auth')
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        // console.log("getDecodedToken",decodedToken.scope)
        if (decodedToken.scope !== 'login') {
            throw new AuthError('invalid auth token provided');
        }
        const user = await getAdmin(decodedToken.id);
        if (!user) {
            throw new AuthError('invalid auth token provided');
        }
        // console.log(`user name ${user.name}`)
        req.user = user;
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

exports.sellerSignin = async (req, res, next) => {
    try {
        console.log('seller auth')
        const decodedToken = await getDecodedToken(req.get('Authorization'));
        // console.log("getDecodedToken",decodedToken.scope)
        if (decodedToken.scope !== 'login') {
            throw new AuthError('invalid auth token provided');
        }
        const user = await getSeller(decodedToken.id);
        if (!user) {
            throw new AuthError('invalid auth token provided');
        }
        // console.log(`user name ${user.name}`)
        req.user = user;
        next();
    } catch (error) {
        handleAuthErrors(next, error);
    }
}

const handleAuthErrors = (next, error) => {
    try {
        // console.log(error);
        if (error instanceof AuthError || error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            error.status = 401;
        }
        next(error);
    } catch (error) {
        // console.log(error);
        next(error);
    }
}

const getDecodedToken = async (authHeader) => {
    try {
        // console.log('entered get decoded token utility....');
        // console.log('authHeader',authHeader)
        if (!authHeader) {
            throw new AuthError('token not provided or user not logged in')
        }
        const authHeaderStringSplit = authHeader.split(' ');
        if (!authHeaderStringSplit[0] || authHeaderStringSplit[0].toLowerCase() !== 'bearer' || !authHeaderStringSplit[1]) {
            throw new AuthError('token not provided or user not logged in');
        }

        const token = authHeaderStringSplit[1];
        const decodedToken = tokenHelper.getDecodedToken(token);
        // console.log("deodetoken",decodedToken)
        return decodedToken;
    } catch (error) {
        throw error;
    }
}

const getUser = async (userId) => {
    try {
        const user = await User.findById(userId).lean();
        return user;
    } catch (error) {
        throw error;
    }
}

const getAdmin = async (adminId) => {
    try {
        const Admin = await admin.findById(adminId).lean();
        if (Admin) {
            Admin.Admin = true;
        }
        return Admin;
    } catch (error) {
        throw error;
    }
}

const getSeller = async (sellerId) => {
    try {
        const Seller = await seller.findById(sellerId).lean();
        if (Seller) {
            Seller.Seller = true;
        }
        return Seller;
    } catch (error) {
        throw error;
    }
}