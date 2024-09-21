document.addEventListener("DOMContentLoaded", getAllUser());
const addbtn=document.querySelector("#addbtn");
addbtn.addEventListener("click",addUser)
let searchBtn =document.querySelector("#search-btn")
searchBtn.addEventListener("click",searchByName)

//request functions


//getting all user

async function getAllUser() {
    try {
        const response = await fetch('http://localhost:3000/admin/all-user');
        const user = await response.json();
        if (user) {
            for (let i = 0; i < user.data.length; i++) {
                createRows(user.data[i].name, user.data[i].email, user.data[i].phone)
            }
        } else {
            console.log(user)
        }
    } catch (error) {
        console.log(error.message);
    }
}


//delete a user

async function deleteUser(Email) {

    console.log(Email)

    try {
        const response = await fetch('http://localhost:3000/admin/delete-user', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: Email
            })
        })
        const data = await response.json();
        if (data) {
            location.reload();
        }
    } catch (error) {
        console.log(error.message)
    }

}


//creating a user

async function addUser(){

    let firstname=document.querySelector("#first-name").value
    let lastname=document.querySelector("#last-name").value
    const name=firstname+" "+lastname;
    let email=document.querySelector("#email").value
    let phone=document.querySelector("#phone").value;

    console.log(firstname);
    const data={
        name:name,
        email:email,
        phone:phone
    }
    
    try {
        const response=await fetch('http://localhost:3000/admin/create-user',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        });
        const responseData=response.json();
        if(responseData){
            location.reload();
        }
        
    } catch (error) {
        console.log(error.message)
    }
}


//searching user by name

async function searchByName(e){
    e.preventDefault();
    let searchInp=document.querySelector("#search-inp").value
    try {
        const response=await fetch(`http://localhost:3000/admin/all-conditioned-user/${searchInp}`)
        const responseData=await response.json();
        if(responseData){
            console.log(responseData);
            document.querySelector("#result").style.display="none";
            let output=document.querySelector("#output");
            output.style.display="block";
            for(let i=0;i<responseData.data.length;i++){
                let personEmail=document.createElement("p");
                personEmail.innerText=responseData.data[i].email;
                output.appendChild(personEmail);
                console.log(personEmail);
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}


//control functions

function createRows(name, email, phone) {
    const tableBody = document.querySelector("#table-body");
    const rows = document.createElement('tr')
    tableBody.appendChild(rows);
    const Name = document.createElement('td');
    Name.innerText = name;
    const Email = document.createElement('td');
    Email.innerText = email
    const Phone = document.createElement('td');
    Phone.innerText = phone
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete"
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
        deleteUser(email);
    })

    rows.append(Name, Email, Phone, deleteButton);
}

