const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/routes');
const { errorHandler, notFoundHandler, logger } = require('./api/middlewares/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);
app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});