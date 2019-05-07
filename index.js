var express = require('express');
var cors = require('cors');
var path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

var app = express();

var ImageDir = path.join(__dirname, '/imageUploads');
app.use(express.static(ImageDir));

var ProfileImageDir = path.join(__dirname, '/profileImage');
app.use(express.static(ProfileImageDir));
    
app.use('/swagger-api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const { db } = require('./config/database');
const fruitsRoute = require('./router/fruitsRoute');
const userRoute = require('./router/userRoute');
const cartRoute = require('./router/cartRoute');
const deliveryDetails = require('./router/deliveryDetailsRoute');
const orderRoute = require('./router/orderRoute');
const registerRoute = require('./router/registrationDataRoute');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/user', userRoute);
app.use('/fruits', fruitsRoute);
app.use('/cart', cartRoute);
app.use('/delivery', deliveryDetails);
app.use('/order', orderRoute);
app.use('/register', registerRoute);

db.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})

app.listen(3001, (err) => {
    if (err) {
        console.log('Error in connecting with port 3001');
    } else {
        console.log('Server has been set up on port 3001');
    }
});