// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxyqOXzuvtsGMMemiIVfOIgnSnj9BF6v4",
    authDomain: "aiiburtel-5a752.firebaseapp.com",
    databaseURL: "https://aiiburtel-5a752.firebaseio.com",
    projectId: "aiiburtel-5a752",
    storageBucket: "aiiburtel-5a752.appspot.com",
    messagingSenderId: "39758121316"
};
const app = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore(app);

// Disable deprecated features
const settings = { timestampsInSnapshots: true };
db.settings(settings)
// document.addEventListener('DOMContentLoaded', loadContent)


let editorcontent = document.getElementById("editor");

editorcontent.addEventListener("change", (e) => {
    e.preventDefault();
})

document.getElementById("submit").addEventListener("click", () => {
    console.log(editorcontent.value);
    db.collection("callGuide").doc("content").update({
        content: editorcontent.value
    })
        .then(function () {
            window.location.href = "callGuide.html";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            alert("unable to saved, check internet connection")
        });
});
loadContent = () => {
    db.collection("callGuide").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            editorcontent.value = doc.data().content;
        });
    });
}
loadContent();
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {
        defaultTime: 'now', autoClose: true
    });
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

document.querySelector(".collapsible-header").addEventListener("click", toggle);
// document.querySelector(".fixed-action-btn").addEventListener("click", toggleAction);
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
}
var notificationListElement = document.getElementById('list');



