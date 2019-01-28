// Initialize Firebase
var config = {
    apiKey: "AIzaSyDkQtf0m_J285chLPN33FKzu9S_Qw4mEFI",
    authDomain: "customer-engagement-manager.firebaseapp.com",
    databaseURL: "https://customer-engagement-manager.firebaseio.com",
    projectId: "customer-engagement-manager",
    storageBucket: "customer-engagement-manager.appspot.com",
    messagingSenderId: "213181401102"
};
var app = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore(app);

// Disable deprecated features
const settings = { timestampsInSnapshots: true };
db.settings(settings);

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'left',
        draggable: true
    });
});
// let commissionRate = [];

document.querySelector(".collapsible-header").addEventListener("click", toggle);
document.querySelector(".sidenav-trigger").addEventListener("click", slide);

function toggle() {
    document.querySelector(".collapsible-body").classList.toggle("active");
}
loadMessages = () => {
    db.collection("commission").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().prodct}`);
            displayMessage(doc.id, doc.data().prodct, doc.data().percent)
            // let obj = {
            //     name: doc.data().prodct, pcnt: doc.data().percent
            // }
            // commissionRate.push(obj);
        });

    });
}
loadMessages();
document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    let product = document.getElementById("pro").value;
    let percent = document.getElementById("per").value;

    db.collection("commission").add({
        prodct: product,
        percent: percent
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("form").reset();
            loadMessages();

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            alert("unable to saved, check internet connection")
        });
});

function slide() {
    document.querySelector(".sidenav").classList.toggle("listslide");
}



var MESSAGE_TEMPLATE =
    '<tr class="highlight">' +
    '<td class="product"></td>' +
    '<td class="perct"></td>' +
    '</tr>'
    ;

// Displays a commission in the UI.
function displayMessage(index, product, percentage) {
    var tbody = document.getElementById(index);
    // If an element for that message does not exists yet we create it.
    if (!tbody) {
        var container = document.createElement('tbody');
        container.innerHTML = MESSAGE_TEMPLATE;
        tbody = container.firstChild;
        tbody.setAttribute('id', index);
        messageListElement.appendChild(tbody);
    }

    tbody.querySelector('.product').textContent = product;
    tbody.querySelector('.perct').textContent = percentage;


}
var messageListElement = document.getElementById('commissions');

// loadCommission = (...args) => {
//     args.map(comm => {
//         for (i = 0; i < comm.length; i++)
//             displayMessage(i, comm[i].name, comm[i].pcnt)
//     })

// }
// loadCommission(commissionRate);
const currentDate = new Date();
// console.log(currentDate.toDateString());
notification = () => {
    db.collection("vendorCallSummary").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().futureAppointmentDate}`);
            const notificationDate = new Date(`${doc.data().futureAppointmentDate}` + ` ${doc.data().time}`)
            // console.log(date);
            if (currentDate.toDateString() === notificationDate.toDateString() && currentDate.getHours() === notificationDate.getHours()) {
                displayNotification(doc.id, `You need to call ${doc.data().name} by ${doc.data().time} today`);
                document.getElementById("noticeSpan").classList.remove("white");
            } else {
                displayNotification(0, "No notification yet");
            }
        });
    });
}
notification();
let NOTIFICATION_TEMPLATE =
    '<ul id="ul_o">' +
    '<li class="notify"></li>' +
    '</ul>'
    ;
// Displays a notification in the UI.
function displayNotification(index, notification) {
    var ul = document.getElementById(index);
    // If an element for that message does not exists yet we create it.
    if (!ul) {
        var container = document.createElement('ul');
        container.innerHTML = NOTIFICATION_TEMPLATE;
        ul = container.firstChild;
        ul.setAttribute('id', index);
        notificationListElement.appendChild(ul);
    }
    ul.querySelector('.notify').innerHTML = notification;
    // listLength = document.getElementById("ul_o").getElementsByTagName("li").length;
}
var notificationListElement = document.getElementById('list');


