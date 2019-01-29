// Initialize Firebase
var config = {
    apiKey: "AIzaSyDkQtf0m_J285chLPN33FKzu9S_Qw4mEFI",
    authDomain: "customer-engagement-manager.firebaseapp.com",
    databaseURL: "https://customer-engagement-manager.firebaseio.com",
    projectId: "customer-engagement-manager",
    storageBucket: "customer-engagement-manager.appspot.com",
    messagingSenderId: "213181401102"
};
const app = firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore(app);


// Disable deprecated features
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// const messaging = firebase.messaging();
// // Add the public key generated from the console here.
// messaging.usePublicVapidKey("BJ3AfB1q3oONq15N4cFunPqZBLi0WXKJrHDFAd3YNT_VbJqcRozpUl36XGQHiIkYeLn-SLYCYZut5hM1S90dSfI");
// messaging.requestPermission().then(function () {
//     console.log("permitted");

// }).catch(function (err) {
//     console.log("not permitted");

// })
const submitbutton = document.getElementById("submit");

submitbutton.addEventListener("click", (e) => {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phoneNo").value;
    var purpose = document.getElementById("Purpose").value;
    var summary = document.getElementById("summary").value;
    var fad = document.getElementById("fad").value;
    var others = document.getElementById("others").value;
    var email = document.getElementById("email").value;
    var time = document.getElementById("time").value;


    console.log(name);

    db.collection("vendorCallSummary").add({
        name: name,
        phoneNo: phone,
        purposeOfCall: purpose,
        callSummary: summary,
        futureAppointmentDate: fad,
        email:email,
        others: others,
        time: time
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert("saved");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            alert("unable to saved, check internet connection")
        });
});



// getAllRestaurants = function (renderer) {
//     var query = firebase.firestore()
//         .collection('vendorCallSummary')
//         .orderBy('fad', 'name')
//         .limit(50);

//     this.getDocumentsInQuery(query, renderer);
// };

// getDocumentsInQuery = function (query, renderer) {
//     query.onSnapshot(function (snapshot) {
//         if (!snapshot.size) return renderer.empty(); // Display "There are no record.

//         snapshot.docChanges().forEach(function (change) {
//             if (change.type === 'removed') {
//                 renderer.remove(change.doc);
//             } else {
//                 renderer.display(change.doc);
//             }
//         });
//     });
// };
document.addEventListener('DOMContentLoaded', function () {
    var elem = document.querySelectorAll('.tabs');
    var instance = M.Tabs.getInstance(elem, {
        swipeable: true,
        responsiveThreshold: "1024px"
    });
    // instance.select('tabs');
    // instance.updateTabIndicator();

});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        showMonthAfterYear: true,
        autoClose: true
    });
    // instance.gotoDate(new Date());
});
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
