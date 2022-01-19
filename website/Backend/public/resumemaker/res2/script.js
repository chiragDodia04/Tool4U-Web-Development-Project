document.getElementById("download").style.display="none";

function addNewWEField() {
    // console.log("Add new field");

    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows",2);
    newNode.setAttribute("placeholder", "Enter here");

    let weOb = document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton");

    weOb.insertBefore(newNode, weAddButtonOb);
};

function addNewAQField() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("aqField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows",2);
    newNode.setAttribute("placeholder", "Enter here");

    let aqOb = document.getElementById("aq");
    let aqAddButtonOb = document.getElementById("aqAddButton");

    aqOb.insertBefore(newNode, aqAddButtonOb);
};

//generating resume
function generateResume() {
    // console.log("generating resume");

    //Name
    let nameField = document.getElementById("nameField").value;
    let nameT1 = document.getElementById("nameT1") //.innerHTML = nameField;
    nameT1.innerHTML = nameField;
    document.getElementById("nameT2").innerHTML = nameField; //direct 

    //Contact
    document.getElementById("contactT").innerHTML = document.getElementById("contactField").value;

    //Email ID
    document.getElementById("mailT").innerHTML = document.getElementById("mailField").value;

    //Address
    document.getElementById("addressT").innerHTML = document.getElementById("addressField").value;

    //Code for setting image
    let file = document.getElementById("imgField").files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result);
    //Set the image to template
    reader.onloadend = function() {
        document.getElementById("imgT").src = reader.result; //document.getElementById("imgT").setAttribute("src", "reader.result");
    };
    

    //LinkedIn Link
    document.getElementById("linkedT").innerHTML = document.getElementById("linkedField").value;

    //Github Link
    document.getElementById("gitT").innerHTML = document.getElementById("gitField").value;

    //Objective
    document.getElementById("objectiveT").innerHTML = document.getElementById("objectiveField").value;

    //Work Experience
    let wes = document.getElementsByClassName("weField");
    let str = "";
    for(let e of wes) {
        str = str + `<li> ${e.value} </li>`;
    }
    document.getElementById("weT").innerHTML = str;

    //Academic Qualification
    let aqs = document.getElementsByClassName("aqField");
    let str1 = "";
    for(let e of aqs) {
        str1 += `<li> ${e.value} </li>`;
    }
    document.getElementById("aqT").innerHTML = str1;

    document.getElementById("resume-form").style.display="none";
    document.getElementById("download").style.display="flex";
    document.getElementById("resume-template").style.display="block";

}

//Print Resume
// function printResume() {
//     window.print();
// }

window.onload = function() {
    document.getElementById("download")
    .addEventListener("click", () => {
        const resume = this.document.getElementById("resume-template");
        console.log(resume);
        console.log(window);
        var opt = {
            pagebreak:  CSS,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 4 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
        html2pdf().from(resume).set(opt).toPdf().save("resume");
    });
};
