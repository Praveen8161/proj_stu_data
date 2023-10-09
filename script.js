// https://6523738ef43b179384156c7e.mockapi.io/student
//select the DOM Element
const studentList = document.querySelector("#student-list");

//API Webnsite
let api = "https://6523738ef43b179384156c7e.mockapi.io/student";

//render student data and adding it to DOM Element
function renderStudent(stud){
    const studentDiv = document.createElement("div");
    studentDiv.setAttribute("class","card");
    studentDiv.innerHTML = `
    <h2>${stud.name}</h2>
    <p><span>Batch: </span>${stud.batch}</p>
    <p><span>Age: </span>${stud.age}</p>
    <button data-id="${stud.id}" class="dlt-btn">Delete</button>`;
    
    studentList.append(studentDiv);
}


//deleting the data
function deleteData(id,parent){
    fetch(`${api}/${id}`,{
        method:"DELETE",
        headers:{
            "content-type":"application-json",
        },
    })
    .then(() => (parent.remove())) //it will delete the data from api website
    .catch((err) => console.log(err));
}

//calling API
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

stuData(); //calling render student function

studentList.addEventListener("click",(e) => {
    // console.log(e.target);
    if(e.target.className === "dlt-btn"){
        const id = e.target.dataset.id;
        const parent = e.target.parentNode;

        // console.log(id,parent);
        // parent.remove(); // in this it will not delete from api website

        deleteData(id,parent);
    }
});