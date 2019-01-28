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
let listLength;


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



const commission = [{ name: "good", pcnt: "2" }, { name: "dog", pcnt: "3" }, { name: "bad", pcnt: "20" }, { name: "baby", pcnt: "23" }];

function findMatches(wordToMatch, commission) {
    return commission.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.pcnt.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, commission);
    const html = matchArray.map(category => {
        const regex = new RegExp(this.value, 'i');
        let search = category.name.replace(regex, `${this.value}`);
        let percentage = category.pcnt.replace(regex, `${this.value}`);
        return `
         <option value="${search}">${percentage}</option>
         `;
    }).join('');
    datalist.innerHTML = html;
};
const searchInput = document.querySelector('.search');
const datalist = document.getElementById('suggestions');
const answerBoard = document.getElementById('answer');
const input = document.getElementById('data_list');
const priceTag = document.querySelector(".amount");
let amount;
let _value;

searchInput.addEventListener("click", displayMatches)
priceTag.addEventListener("keyup", submit);
document.addEventListener("DOMContentLoaded", fill);

function fill(e) {
    e.preventDefault();
    for (var i = 0; i < commission.length; i++) {
        let optionNode = datalist.createElement("option");
        optionNode.value = `${search}`;
        optionNode.appendChild(document.createTextNode(`${percentage}`));
    }
}

function submit() {
    amount = document.querySelector(".amount").value;
    console.log(amount);
    let answer = (_value / 100) * amount;
    answerBoard.innerHTML = answer;
}

input.addEventListener('change', () => {
    _value = null;
    let input_value = input.value;
    let options = datalist.children;
    let i = options.length;
    while (i--) {
        let option = options[i];
        if (option.value == input_value) {
            _value = option.textContent;
            break;
        }
    }
    if (_value == null) {
        console.warn('Value does not exist');
        return false;
    }
    console.log('The value is:', _value);
})


