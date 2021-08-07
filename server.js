const express = require('express');
const app = express();
// const port = process.env.PORT || 4200;
const port = process.env.PORT || 4210;

app.use('/', express.static('dist/d24'));
app.use('/login', express.static('dist/d24'));
app.use('/recover', express.static('dist/d24'));
app.use('/registration', express.static('dist/d24'));
app.use('/calculator', express.static('dist/d24'));
app.use('/home', express.static('dist/d24'));
app.use('/order', express.static('dist/d24'));
app.use('/journal', express.static('dist/d24'));
app.use('/template', express.static('dist/d24'));
app.use('/book', express.static('dist/d24'));
app.use('/users', express.static('dist/d24'));
app.use('/documents', express.static('dist/d24'));
app.use('/instruction', express.static('dist/d24'));
app.use('/profile', express.static('dist/d24'));


app.listen(port, () => {
    console.log('Listening port: ' + port);
});