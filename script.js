
//select Main DOM Element
const studentList = document.querySelector("#student-list");
const studentForm = document.querySelector("#student-form");
let editID;

//API Webnsite
let api = "https://6523738ef43b179384156c7e.mockapi.io/student";

//form to add a student data
studentForm.innerHTML = `       
    <form class="form-data">
    <h2 class="form-head">Student Form</h2>
    <input type="text" name="name" placeholder="Student Name" id="input-name" class="input-text" required>

    <input type="text" name="batch" placeholder="Batch Name" id="input-batch" class="input-text" required>

    <input type="text" name="age" placeholder="Student Age" id="input-age" class="input-text" required>
    <button type="submit" id="add-btn" class="btn">Add Student</button>
    <button type="submit" id="update-btn" class="btn">Update Student</button>
    </form>`;

//Getting a form elements DOM
let stuName = document.getElementById("input-name");
let stuBatch = document.getElementById("input-batch");
let stuAge = document.getElementById("input-age");
let addBtn = document.querySelector("#add-btn");
let updateBtn = document.querySelector("#update-btn");
updateBtn.style.display = "none";


//render student data and adding it to DOM Element
//GET student data initial page loading
function renderStudent(stud){
    const studentDiv = document.createElement("div");
    studentDiv.setAttribute("class","card");
    studentDiv.innerHTML = `
    <h2>${stud.name}</h2>
    <p><span class="span-h">Batch: </span><span class="data-batch">${stud.batch}</span></p>
    <p><span class="span-h">Age: </span><span class="data-age">${stud.age}</span></p>
    <div class="btn-grp">
    <button data-id="${stud.id}" id="edit-btn" class="btn">Edit</button>
    <button data-id="${stud.id}" id="dlt-btn" class="btn">Delete</button>
    </div>`;
    
    studentList.append(studentDiv);
}

//API Function for GET function
async function stuData(){
    try {
        let fet = await fetch(api,{method:"GET"});

        let res = await fet.json();
    
        res.forEach((val) => {
            renderStudent(val);
        });
    }catch (err) {
        console.log(err);
    }
}
stuData(); //calling API to render student function

//POST function
function addStudent(newStu){
    fetch(api,{
        method:"POST",
        body:JSON.stringify(newStu),
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => renderStudent(data))
    .then(() => {
        stuName.value = "" ;
        stuBatch.value = "" ;
        stuAge.value = "" ;
    })
    .catch((err) => console.log(err));
}

//DELETE the Student data
function deleteData(id,parent){
    fetch(`${api}/${id}`,{
        method:"DELETE", //it delete data from API
        headers:{
            "content-type":"application-json",
        },
    })
    .then(() => (parent.parentNode.remove())) //it will delete the data from current website
    .catch((err) => console.log(err));
}

//PUT or Update student data
function updateStudentData(editedData){
    fetch(`${api}/${editID}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(editedData),
    })
    .then((res) => res.json())
    .then(() => location.reload())
    .catch((err) => console.log(err));
}

//Event Listeners for Form to Append(POST) or UPDATE(PUT) Data
studentForm.addEventListener("click",(e) => {
    e.preventDefault();

    //calling Post request to append a student data
    if(e.target.id === "add-btn"){
        if(stuName.value && stuBatch.value && stuAge.value){
            const newStu = {
                name: stuName.value,
                batch: stuBatch.value,
                age: stuAge.value,
            };
            addStudent(newStu);
        }else{
            alert("Please enter the required Field");
        }
    }

    //Updating the Student data
    if(e.target.id === "update-btn"){
        if(stuName.value && stuBatch.value && stuAge.value){
            const editedData = {
                name: stuName.value,
                batch: stuBatch.value,
                age: stuAge.value,
            };
            updateStudentData(editedData);
        }else{
            alert("Please enter the valid Data");
        }
    }
});


// To populate the FORM
function populateStudentForm(parent){
    const editableParent = parent.parentNode;
    stuName.value = editableParent.querySelector("h2").textContent;
    stuBatch.value = editableParent.querySelector(".data-batch").textContent;
    stuAge.value = editableParent.querySelector(".data-age").textContent;
    updateBtn.style.display = "block";
    addBtn.style.display = "none";
}


//Event Listeners for Student card to DELETE or Edit Data
studentList.addEventListener("click",(e) => {

    const id = e.target.dataset.id;
    const parent = e.target.parentNode;

    //calling a deleting function for data
    if(e.target.id === "dlt-btn"){
        // parent.parentNode.remove(); // in this it will not delete from API only from website
        deleteData(id,parent);
    }

    //calling to populate the Form
    if(e.target.id === "edit-btn"){
        editID = id;
        populateStudentForm(parent);
    }
});