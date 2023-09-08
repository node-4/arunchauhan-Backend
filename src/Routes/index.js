
const express = require('express');
const route = express.Router();

route.use('/accessorie', require('./AccessorieRoutes'));
route.use('/skill', require('./skillRoutes'));
route.use('/user', require('./UserRoutes'));
route.use('/admin', require('./AdminRoutes'));
route.use('/banner', require('./BannerRoutes'));
route.use('/category', require('./CategoryRoutes'));
route.use('/brand', require('./BrandRoutes'));
route.use('/blog', require('./BlogRoutes'));
route.use('/product', require('./ProductRoutes'));
route.use('/service-type', require('./ServiceTypeRoutes'));
route.use('/service', require('./ServicesRoutes'));
route.use('/perodic-service', require('./PeriodicServiceRoutes'));
route.use('/seller', require('./SellerRoutes'));
route.use('/cart', require('./CartRoutes'));
route.use('/order', require('./order'))
route.use('/privacy', require('./privacy'))
route.use('/terms', require('./terms'));
route.use('/review', require('./review'));
route.use('/about', require('./aboutUs'));
route.use('/help', require('./helpandSupport'));
route.use('/coupon', require('./coupon'));
route.use('/subCategory', require('./subcategory'));
route.use('/feedback', require('./feedback'));
route.use('/installer', require('./installer_auth'));
route.use('/notify', require('./notification'))
route.use('/installingPartner', require('./installingPartner'))
route.use('/Payment', require('./payment'))

module.exports = route
