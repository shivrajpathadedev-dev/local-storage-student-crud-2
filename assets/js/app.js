const cl = console.log;


const todobody = document.getElementById('todobody');
const stdform = document.getElementById('stdform');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const subbtn = document.getElementById('subbtn');
const updbtn = document.getElementById('updbtn');

let stdarr;
if (localStorage.getItem('stdarr')) {
    stdarr = JSON.parse(localStorage.getItem('stdarr'))
} else {
    stdarr = [];
}

function snackeBar(msg, iconValue) {
    Swal.fire({
        text: msg,
        icon: iconValue,
        timer: 3000
    });
}

function createList(stdarr) {
    let result = ``

    stdarr.forEach((c, i) => {
        result += `<tr id="${c.stdId}">
                                    <td>${i + 1}</td>
                                    <td>${c.fname} ${c.lname}</td>
                                    <td>${c.email}</td>
                                    <td>${c.contact}</td>
                                    <td><i onclick="OnEditbtn(this)" class="fa-solid fa-pen-to-square text-primary fa-2x"></i></td>
                                    <td><i onclick="onRemovebtn(this)" class="fa-regular fa-trash-can text-danger fa-2x"></i></td>
                                </tr>`
    });
    todobody.innerHTML = result;
}

//add
function onaddstd(eve) {
    eve.preventDefault();

    let stdObj = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contact: contact.value,
        stdId: Date.now().toString()
    }

    stdform.reset();
    stdarr.push(stdObj);
    localStorage.setItem('stdarr', JSON.stringify(stdarr));


    let tr = document.createElement('tr');
    tr.id = stdObj.stdId;
    tr.innerHTML = `<td>${stdarr.length}</td>
                                    <td>${stdObj.fname} ${stdObj.lname}</td>
                                    <td>${stdObj.email}</td>
                                    <td>${stdObj.contact}</td>
                                    <td><i onclick="OnEditbtn(this)" class="fa-solid fa-pen-to-square text-primary fa-2x"></i></td>
                                    <td><i onclick="onRemovebtn(this)" class="fa-regular fa-trash-can text-danger fa-2x"></i></td>`
    todobody.append(tr);
    snackeBar(`The TodoItem ${stdObj.fname} ${stdObj.lname} is Added successfully !!!`, `success`)
}

//remove
function onRemovebtn(eve) {
    let REMOVE_ID = eve.closest('tr').id;
    let getconform = confirm('are you sure do you want to delete the student');

    if (getconform) {
        let getIndex = stdarr.findIndex(c => c.stdId === REMOVE_ID);
         let student=stdarr.splice(getIndex, 1);
        localStorage.setItem('stdarr', JSON.stringify(stdarr));
        eve.closest('tr').remove();
        let tds=[...document.querySelectorAll('#todobody tr td:first-child')];
        tds.forEach((c,i)=>c.innerText=i+1);

        snackeBar(`The Item ${student[0].fname} ${student[0].lname} Removed Successfully !!!`, `success`);
    }

}

//edit
function OnEditbtn(eve) {
    let EDIT_ID = eve.closest('tr').id;
    localStorage.setItem('EDIT_ID', JSON.stringify(EDIT_ID));
    let EDIT_OBJ = stdarr.find(c => c.stdId === EDIT_ID);

    fname.value = EDIT_OBJ.fname;
    lname.value = EDIT_OBJ.lname;
    email.value = EDIT_OBJ.email;
    contact.value = EDIT_OBJ.contact

    subbtn.classList.add('d-none');
    updbtn.classList.remove('d-none');

}

//update
function onupdbtn(eve) {
    let UPD_ID = JSON.parse(localStorage.getItem('EDIT_ID'));
    localStorage.removeItem('EDIT_ID');
    let UPD_OBJ = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contact: contact.value,
        stdid: UPD_ID
    };

    stdform.reset();
    let getIndex = stdarr.findIndex(c => c.stdid === UPD_ID);
    stdarr[getIndex] = UPD_OBJ;

    let tr = [...document.getElementById(UPD_ID).children]

    tr[1].innerText = `${UPD_OBJ.fname} ${UPD_OBJ.lname}`
    tr[2].innerText = UPD_OBJ.email
    tr[3].innerText = UPD_OBJ.contact

    updbtn.classList.add('d-none');
    subbtn.classList.remove('d-none');

    snackeBar(` Todo item is  Updated successfuly !!!`)
}

createList(stdarr);
stdform.addEventListener('submit', onaddstd);
updbtn.addEventListener('click', onupdbtn);