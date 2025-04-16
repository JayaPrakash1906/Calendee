const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./Routes/route');
const eventController = require('./Routes/route');
const BiometricController = require('./Routes/route');
const TechnicalController = require('./Routes/route');
const MailController = require('./Routes/route');
const cors = require('cors');




const app = express();
const PORT =  3002;
app.use(cors());

app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/auth', authController);
app.use('/api', eventController);
app.use('/api', BiometricController);
app.use('/test', TechnicalController);
app.use('/api', MailController);


