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

searchInput.addEventListener("keydown", displayMatches);
searchInput.addEventListener("click", displayMatches)
priceTag.addEventListener("keyup", submit);
window.addEventListener("load", fill);

function fill(e) {
    e.preventDefault();
    for (var i = 0; i < commission.length; i++) {
        // var optionNode = datalist.createElement("option");
        datalist.createElement("option").value = `${search}`;
        datalist.createElement("option").appendChild(document.createTextNode(`${percentage}`));
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



