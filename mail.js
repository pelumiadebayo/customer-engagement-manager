CKEDITOR.replace('mailTextArea', {
    height: 260,
    width: 500,
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'top'
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'left',
        draggable: true
    });

});
// var nodemailer = require('nodemailer');

// // Create the transporter with the required configuration for Gmail
// // change the user and pass !
// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'adepelumi1996@gmail.com',
//         pass: 'sapphire001'
//     }
// });

// // setup e-mail data
// var mailOptions = {
//     from: '"Our Code World " <adepelumi1996@gmail.com>', // sender address (who sends)
//     to: 'sapphirepelum@gmail.com', // list of receivers (who receives)
//     subject: 'Hello', // Subject line
//     text: 'Hello world ', // plaintext body
//     html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         return console.log(error);
//     }

//     console.log('Message sent: ' + info.response);
// });

document.querySelector(".collapsible-header").addEventListener("click", toggle);
document.querySelector(".fixed-action-btn").addEventListener("hover", toggleAction);
document.querySelector(".sidenav-trigger").addEventListener("click", slide);

function toggle() {
    document.querySelector(".collapsible-body").classList.toggle("active")
}
function toggleAction() {
    document.querySelector(".fixed-action-btn").classList.toggle("activeAction")
}
function slide() {
    document.querySelector(".sidenav").classList.toggle("listslide");
}

