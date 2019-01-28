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

// function loadMessages() {
//     // Loads the last 12 messages and listen for new ones.
//     var callback = function (snap) {
//         var data = snap.val();
//         displayMessage(snap.key, data.name, data.phoneNo, data.futureAppointmentDate);
//     };

//     firebase.database().ref('/vendorCallSummary/').limitToLast(12).on('child_added', callback);
//     firebase.database().ref('/vendorCallSummary/').limitToLast(12).on('child_changed', callback);
// }
loadMessages = () => {
    db.collection("vendorCallSummary").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().name}`);
            displayMessage(doc.id, doc.data().name, doc.data().phoneNo, doc.data().futureAppointmentDate);
        });
    });
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<tr class="highlight">' +
    '<td class="name"></td>' +
    '<td class="contact"></td>' +
    '<td class="appointmentDate"></td>' +
    '</tr>'
    ;

// Displays a Message in the UI.
function displayMessage(key, name, phone, appointment) {
    var tbody = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!tbody) {
        var container = document.createElement('tbody');
        container.innerHTML = MESSAGE_TEMPLATE;
        tbody = container.firstChild;
        tbody.setAttribute('id', key);
        messageListElement.appendChild(tbody);
    }

    tbody.querySelector('.name').textContent = name;
    tbody.querySelector('.contact').textContent = phone;
    tbody.querySelector('.appointmentDate').textContent = appointment;
}
var messageListElement = document.getElementById('summary');
loadMessages();

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
