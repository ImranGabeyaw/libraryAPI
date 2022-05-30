const mongodb_url = ''

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override')
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bookRoutes = require('./routes/bookRoutes');
const formRoutes = require('./routes/formRoutes');
const forumRoutes = require('./routes/forumRoutes');

const PORT = 8889;

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

var corsOptions = {
    origin: "http://localhost:8889",
};
mongoose
    .connect(mongodb_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });



app.get("/", (req, res) => {
    res.render('index', {});
});

app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(cors(corsOptions));
app.use('/book', bookRoutes);
app.use('/forms', formRoutes);
app.use('/forum', forumRoutes)

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        socket.join(data.room);
        io.to(data.room).emit('chat message', data.user+ ": " + data.msg);
    });
});

server.listen(8889, () => {
    console.log('listening on port 8889');
});



//app.listen(PORT, () => console.log("listening on port 8889"))