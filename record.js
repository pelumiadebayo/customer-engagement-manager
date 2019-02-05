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
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

var data = [];

loadMessages = () => {
    db.collection("vendorCallSummary").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            displayMessage(doc.id, doc.data().name, doc.data().phoneNo, doc.data().futureAppointmentDate);
        });
    });
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<tr class="high">' +
    '<td class="name"></td>' +
    '<td class="contact"></td>' +
    '<td class="appointmentDate"></td>' +
    '<td><button><i class="close material-icons">close</i></button></td>' +
    '</tr>';

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
var docId;
var item;
var con;
$('#table').on('click', '.high', function () {
    docId = $(this).closest('tr').attr('id');
    // console.log(docId);
    item = $(this).closest('tr').find('.name');
    con = $(this).closest('tr').find('.contact');
    $.each(con, function (key, value) {
        // console.log($(value).text());
        $('#phoneNo').val($(value).text());
    })
    $.each(item, function (key, value) {
        // console.log($(value).text());
        $('#name').val($(value).text());
    })
    $('#edit').removeClass('edit');
});

$('#table').on('click', '.close', () => {
    console.log(docId);
    db.collection("vendorCallSummary").doc(docId).delete().then(function () {
        alert("Document successfully deleted!");
        location.reload();

    }).catch(function (error) {
        alert("Error removing document: ", error);
    });
})


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'left',
        draggable: true
    });

});

document.querySelector(".collapsible-header").addEventListener("click", toggle);
document.querySelector(".sidenav-trigger").addEventListener("click", slide);

function toggle() {
    document.querySelector(".collapsible-body").classList.toggle("active")
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
const editButton = document.getElementById('saveEdit');
editButton.addEventListener('click', () => {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phoneNo').value;

    db.collection("vendorCallSummary").doc(docId).update({
            name: name,
            phoneNo: phone
        }).then(function () {
            alert("Document successfully updated!");
            $('#edit').addClass('edit');
            location.reload();

        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
})


notification();
let NOTIFICATION_TEMPLATE =
    '<ul id="ul_o">' +
    '<li class="notify"></li>' +
    '</ul>';
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