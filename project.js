const addBtn = document.getElementById('addList');
const listtextfield = document.getElementById('list1');
const sublistfield = document.getElementById('list2');
const recordsDisplay = document.getElementById('records');

const btnText = addBtn.innerText;
let listArray = [];
let edit_id = null;
function getdata(){
fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/displaytask?secumode=embeded")
  .then(res => res.json())
  .then((res) => {
    if (res) {
      console.log(res)
      listArray=res;
      Display();

    }
    else {

    }
  })
}
getdata();


addBtn.onclick = () => {
  if (listtextfield.value == '') {
    alert("cannot be empty");

  } else {
    createTask();
    Display();
    // const items = listtextfield.value;
    // const subitems = sublistfield.value;
    // const selectedOption = document.querySelector('input[name="option"]:checked').value;
     

    // if (edit_id != null) {
    //   listArray.splice(edit_id, 1, { 'listItem': items, 'subtask': subitems, 'category': selectedOption });
    //   edit_id = null;
    // } else {
    //   listArray.push({ 'listItem': items, 'subtask': subitems, 'category': selectedOption, });


    // }
    // save(listArray);
    // listtextfield.value = '';
    // sublistfield.value = '';

    // addBtn.innerText = btnText;
    
  }
}

// function save(listArray) {
//   let str = JSON.stringify(listArray);
//   localStorage.setItem('list', str);
//   Display();
// }

function Display() {
  let statement = '';
  listArray.forEach((user, i) => {  
    statement += `<tr id=${"myrow" + (i + 1)} ${user.checked ? "class='linethrough myrow'" : "class='myrow'"}>
               
               <th scope="row">${i + 1}</th>
               <td>${user.task}</td>
               <td>${user.subtask}</td>
               <td>${user.category}</td>
             
               <td><i class="btn text-white fa fa-edit btn-info mx-3" onclick="update(${i})"></i><i class="btn btn-danger fa fa-trash"onclick="Delete(${i})"></i></td>
              <td> <input ${user.checked ? "checked" : null} type="checkbox"class="linethrough" id=${"myCheckbox" + (i + 1)} name="myCheckbox" style="margin-top:5px;width: 40px; height: 20px;" onclick="chkbox(${i + 1})"></td>
               </tr>`;
    recordsDisplay.innerHTML = statement;
  });

}

function Delete(id) {


  // listArray.splice(id, 1);
  // save(listArray);

  fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/deletetask?secumode=embeded",
  {
    method: 'DELETE', headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({
      uri:listArray[id].uri
    })

  }).then(res=>{
getdata();

  })
}

function update(id) {
  // edit_id = id;
  // listtextfield.value = listArray[id].listItem;
  // sublistfield.value = listArray[id].subtask;
  // addBtn.innerText = 'Save changes';
  editTask();
}

/* function chkbox(i){
 // console.log("event: ",e);

 var checkbox = document.getElementById("myCheckbox");

 checkbox.addEventListener('change', function(e) {
     console.log("event: ",e);
     (e.target.value) ? row.classList.add('checked'): undefined
   localStorage.setItem('checkboxState', checkbox.checked);
 });
 

if (localStorage.getItem('checkboxState') === 'true') {
   checkbox.checked = true;
 } else {
   checkbox.checked = false;
 }
}
 */

function chkbox(id) {

  var box = document.getElementById("myCheckbox" + id);

  // listArray = JSON.parse(localStorage.getItem("list"));
  listArray[id - 1]["checked"] = box.checked;
  editTask(id-1);


}


function createTask(){
  const items = listtextfield.value;
    const subitems = sublistfield.value;
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
  fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/createtask?secumode=embeded",
  {
    method: 'POST', headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({
      task: items,
      subtask: subitems,
      category: selectedOption
    })  
  })
  .then((res) => {
    if (res.status === 200) {
      alert("success");
      getdata();
    }
    else {
      alert("failed")
    }
  })

}
console.log("listtextfield: ", listtextfield)


// var request = {
//   method: 'PUT', headers: { 'Content-Type': "application/json" },
//   body: {
//     listtextfield.value=listArray[id].task,
//     // task: listArray[id].task,
//     // subtask: listArray[id].subtask,
//     category: listArray[id].category,
//     uri:listArray[id].uri
  
// }
// }

function editTask(id){
  
  fetch("https://ide.lambdazen.com/eval/rest/lzsample/services/0sjl0_5FFP8k_qBOhZwP5B/editlist?secumode=embeded",
  )
  .then((res) => {
    console.log(res)
    if (res.status === 200) {
      

      getdata();
    }
    else {
      alert("failed")
    }
  })

}

