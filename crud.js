const firebaseConfig = {
    apiKey: "AIzaSyA_UbcBHL70DQnbq5nr3IKVFbw69zY3BG4",
    authDomain: "db-first-c2919.firebaseapp.com",
    databaseURL: "https://db-first-c2919-default-rtdb.firebaseio.com",
    projectId: "db-first-c2919",
    storageBucket: "db-first-c2919.appspot.com",
    messagingSenderId: "1052394635018",
    appId: "1:1052394635018:web:56e97b15cdf963b7c804f3"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function save(){
    // console.log(employName);
    var employCode=document.getElementById("eCode").value;
    var employName=document.getElementById("eName").value;
    var employPhone=document.getElementById("ePhone").value;
    var employEmail=document.getElementById("eEmail").value;
    var employAdrs=document.getElementById("eAdrs").value;
    var employDob=document.getElementById("eDob").value;
    // var employGender=document.querySelector('input[name="gender"]:checked').value;
    // var employMarital=document.querySelector('input[name="Marital"]:checked').value;

    // var e=document.getElementById("Education").value
    // var er=e.options(e.selectedIndex).value;
    // console.log(er)
    
    // console.log(employGender);

    if(employCode == ''){
        alert("Employ Code is Mandatory to Submit");
        return
    }
    const obj={
        Code:employCode,
        Name:employName,
        Phone:employPhone,
        Email:employEmail,
        Address:employAdrs,
        Dob:employDob
        // Gender:employGender,
        // Status:employMarital

        // Education:er
        // Education:employEducation
    }
    firebase.database().ref('/Employ-Registration/' +employCode).set(obj)
    alert("data saved in database");
    show()
    clean()
}


function show(){
    // alert("Show Complete List");
    document.getElementById("table-body").innerHTML="";
    firebase.database().ref('Employ-Registration').once("value",function (AllRecord){
        // console.log(AllRecord);
        AllRecord.forEach(function(snapshot){
            showDataOnTable(snapshot.val().Code,snapshot.val().Name,snapshot.val().Phone,snapshot.val().Email,snapshot.val().Address)
        })
    })
}

function clean(){
    // alert("Input Data reset");
    // var result=document.getElementsByClassName("eAdrs").value     // how to target input value through class
    // var result= document.getElementById("eName", " ePhone").value  // how to target multiple input values by IDs
    // console.log(result)
    document.getElementById("eCode").value=""
    document.getElementById("eName").value=""
    document.getElementById("ePhone").value=""
    document.getElementById("eEmail").value=""
    document.getElementById("eAdrs").value=""
    document.getElementById("eDob").value=""
}


// function showDataOnTable(employCode,employName,employPhone,employEmail,employAdrs,employDob){
function showDataOnTable(employCode,employName,employPhone,employEmail,employAdrs){
    var row= document.createElement("tr");
    cell1=document.createElement("td");
    cell2=document.createElement("td");
    cell3=document.createElement("td");
    cell4=document.createElement("td");
    cell5=document.createElement("td");
    // cell6=document.createElement("td");

    // ****** create td for CRUD button ****** 
    cell6=document.createElement("td");

    // ***** create span to hold data ***** 
    eCodeSpan=document.createElement("span");
    eNameSpan=document.createElement("span");
    ePhoneSpan=document.createElement("span");
    eEmailSpan=document.createElement("span");
    eAdrsSpan=document.createElement("span");
    // eDobSpan=document.createElement("span");

    // ****** create input to hold data for CRUD operations
    eCodeInput=document.createElement("input");
    eNameInput=document.createElement("input");
    ePhoneInput=document.createElement("input");
    eEmailInput=document.createElement("input");
    eAdrsInput=document.createElement("input");
    // eDobInput=document.createElement("input");
    
    // hiding input tags now.., when we will apply CRUD operation we will transfer data into input
    eCodeInput.style.display="none";
    eNameInput.style.display="none";
    ePhoneInput.style.display="none";
    eEmailInput.style.display="none";
    eAdrsInput.style.display="none";
    // eDobInput.style.display="none";

// ***** Assigne Value to recently created spans *****
    eCodeSpan.innerHTML=employCode;
    eNameSpan.innerHTML=employName;
    ePhoneSpan.innerHTML=employPhone;
    eEmailSpan.innerHTML=employEmail;
    eAdrsSpan.innerHTML=employAdrs;
    // eDobSpan.innerHTML=employDob;

    // **** Assigne value to input
    // eNameInput.value=employName;
    // ePhoneInput.value=employPhone;
    // eEmailInput.value=employEmail;
    // eAdrsInput.value=employAdrs;

// ***** appending span variables to created "td's", cells hold td
    cell1.appendChild(eCodeSpan);
    cell2.appendChild(eNameSpan);
    cell3.appendChild(ePhoneSpan);
    cell4.appendChild(eEmailSpan);
    cell5.appendChild(eAdrsSpan);
    // cell6.appendChild(eDobSpan);

// ****** appending input variables to created "td's", cells hold td
    cell1.appendChild(eCodeInput);
    cell2.appendChild(eNameInput);
    cell3.appendChild(ePhoneInput);
    cell4.appendChild(eEmailInput);
    cell5.appendChild(eAdrsInput);
    // cell6.appendChild(eDobInput);

    // ****** create Edit button ******
    btnEdit=document.createElement('input');
    btnEdit.setAttribute("value","Edit");
    btnEdit.setAttribute("type","button");
    btnEdit.setAttribute("onclick","edit(this)");

    // ****** create Update button ******
    btnUpdate=document.createElement('input');
    btnUpdate.setAttribute("value","Update");
    btnUpdate.setAttribute("type","button");
    btnUpdate.style.display="none";
    btnUpdate.setAttribute("onclick","update(this)");

    // ****** create Delete button ******
    btnDelete=document.createElement('input');
    btnDelete.setAttribute("value","Delete");
    btnDelete.setAttribute("type","button");
    btnDelete.setAttribute("onclick","del(this)");

    // ****** appending buttons into cell5
    cell6.appendChild(btnEdit);
    cell6.appendChild(btnUpdate);
    cell6.appendChild(btnDelete);
// variable row holding value of created "tr" ,cells hold value of "td"
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    // row.appendChild(cell6);

    // appending cell5 (buttons) into row
    row.appendChild(cell6);

// appending row to table body
    document.getElementById("table-body").appendChild(row);
}

function edit(here){
    // alert("table edit button");
    row = here.parentNode.parentNode
    row.cells[0].childNodes[1].value = row.cells[0].childNodes[0].innerHTML  // transfer span value to input
    row.cells[0].childNodes[0].style.display="none"                 // span hide
    row.cells[0].childNodes[1].style.display="block"                // input show
    row.cells[5].childNodes[0].style.display="none"                 // edit btn hide
    row.cells[5].childNodes[1].style.display="block"                 // update btn show
    // ****** so on ****** 
    row.cells[1].childNodes[1].value = row.cells[1].childNodes[0].innerHTML  // transfer span value to input
    row.cells[2].childNodes[1].value = row.cells[2].childNodes[0].innerHTML  // transfer span value to input
    row.cells[3].childNodes[1].value = row.cells[3].childNodes[0].innerHTML  // transfer span value to input
    row.cells[4].childNodes[1].value = row.cells[4].childNodes[0].innerHTML  // transfer span value to input
    // row.cells[5].childNodes[1].value = row.cells[5].childNodes[0].innerHTML  // transfer span value to input
    row.cells[1].childNodes[0].style.display="none"                 // span hide
    row.cells[1].childNodes[1].style.display="block"                // input show
    row.cells[2].childNodes[0].style.display="none"                 // span hide
    row.cells[2].childNodes[1].style.display="block"                // input show
    row.cells[3].childNodes[0].style.display="none"                 // span hide
    row.cells[3].childNodes[1].style.display="block"                // input show
    row.cells[4].childNodes[0].style.display="none"                 // span hide
    row.cells[4].childNodes[1].style.display="block"                // input show
    // row.cells[5].childNodes[0].style.display="none"                 // span hide
    // row.cells[5].childNodes[1].style.display="block"                // input show
    
}
function update(here){
    // alert("table update button");
    row=here.parentNode.parentNode;
    row.cells[0].childNodes[0].innerHTML= row.cells[0].childNodes[1].value      // transfer input value to span
    row.cells[0].childNodes[0].style.display="block"                // span show
    row.cells[0].childNodes[1].style.display="none"                 //input hide
    row.cells[5].childNodes[0].style.display="block"                //edit btn show
    row.cells[5].childNodes[1].style.display="none"                 //update btn hide
    // ****** so on ****** 
    row.cells[1].childNodes[0].innerHTML= row.cells[1].childNodes[1].value      // transfer input value to span
    row.cells[2].childNodes[0].innerHTML= row.cells[2].childNodes[1].value      // transfer input value to span
    row.cells[3].childNodes[0].innerHTML= row.cells[3].childNodes[1].value      // transfer input value to span
    row.cells[4].childNodes[0].innerHTML= row.cells[4].childNodes[1].value      // transfer input value to span
    // row.cells[5].childNodes[0].innerHTML= row.cells[5].childNodes[1].value      // transfer input value to span
    row.cells[1].childNodes[0].style.display="block"                // span show
    row.cells[1].childNodes[1].style.display="none"                 //input hide
    row.cells[2].childNodes[0].style.display="block"                // span show
    row.cells[2].childNodes[1].style.display="none"                 //input hide
    row.cells[3].childNodes[0].style.display="block"                // span show
    row.cells[3].childNodes[1].style.display="none"                 //input hide
    row.cells[4].childNodes[0].style.display="block"                // span show
    row.cells[4].childNodes[1].style.display="none"                 //input hide
    // row.cells[5].childNodes[0].style.display="block"                // span show
    // row.cells[5].childNodes[1].style.display="none"                 //input hide

    databaseCode=row.cells[0].childNodes[0].innerHTML;
    databaseName=row.cells[1].childNodes[0].innerHTML;
    databasePhone=row.cells[2].childNodes[0].innerHTML;
    databaseEmail=row.cells[3].childNodes[0].innerHTML;
    databaseAdrs=row.cells[4].childNodes[0].innerHTML;
    // databaseDob=row.cells[5].childNodes[0].innerHTML;
    const obj={
        Code:databaseCode,
        Name:databaseName,
        Phone:databasePhone,
        Email:databaseEmail,
        Address:databaseAdrs,
        // Dob:databaseDob
    }
    firebase.database().ref('/Employ-Registration/'+databaseCode).update(obj)
}
function del(here){
    // alert("table del button");
    row=here.parentNode.parentNode;
    row.style.display="none";
    // *********** Database Delete operation ********** 
    databaseCode=row.cells[0].childNodes[0].innerHTML;
    firebase.database().ref('/Employ-Registration/'+databaseCode).remove();
    alert("Data Deleted");
}

// ********* Search area work ************* 
// const khoj = document.querySelector("#search").addEventlistener("keyup", function(event){
document.querySelector("#search").addEventListener("keyup", function(event){
    // console.log(event.target.value);
    var result=event.target.value;
    // console.log(result);
    firebase.database().ref('Employ-Registration').once("value",function (AllRecord){
        AllRecord.forEach(function(snapshot){
       if(snapshot.val().Code === result ){
        document.getElementById("table-body").innerHTML="";
        showDataOnTable(snapshot.val().Code,snapshot.val().Name,snapshot.val().Phone,snapshot.val().Email,snapshot.val().Address)
        
    }else if(result == ""){
        show();
        // alert("Data not found");
    }else{

        // document.getElementById("table-body").innerHTML="";
    }
    
        })
    })
})