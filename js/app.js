

const form = `<div>
  <div class="form-group">
    <label for="name">Name</label>
        <input type="text" class="form-control" id="name"  placeholder="Enter Your Name">
  </div>
  <div class="form-group mt-3">
    <label for="surname">Surname</label>
    <input type="text" class="form-control" id="surname" placeholder="Enter Your Surname">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="save()">add</button>
</div>`

function table() {
    let table = `<table class="table">
  <thead>
    <tr>
      <th class="col-1">№</th>  
      <th class="col-3">Name</th>
      <th class="col-4">Surname</th>
      <th class="col-2">Edit</th>
      <th class="col-2">Delete</th>
     
    </tr>
  </thead>
  <tbody>`;
    for (let i = 0; i < details.length; i++) {
        table = table + `<tr>
      <td>${i + 1}</td>
      <td>${details[i].name}</td>
      <td>${details[i].surname}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
    </tr> `;
    }
    table = table + `</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
}

document.getElementById("form").innerHTML = form;
details = [];
getData();
table();

function getData() {
    let Data = localStorage.getItem("details");
    if (Data) {
        details = JSON.parse(Data);
    } else {
        setData();
    }
}

function setData() {
    localStorage.setItem("details", JSON.stringify(details));
}

function save() {
    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let init = document.getElementById('[1]')

    if (name.value === 0) {
        console.log("name is Empty")
        return
    }
    let data = {
        name: name.value,
        surname: surname.value
    }
    details.push(data);
    setData();

    table()
    name.value = ""
    surname.value = ""
}

function deleteData(index) {
    details.splice(index, 1);
    setData();
    table();
}

function edit(index) {
    let editForm = `<div>
  <div class="form-group">
    <label for="name">Update Name</label>
    <input type="text" value="${details[index].name}" class="form-control" id="newName" aria-describedby="emailHelp" placeholder="Update Your Name">
  </div>
  <div class="form-group mt-3">
    <label for="Surname">Surname</label>
    <input type="text" value="${details[index].surname}" class="form-control" id="newSurname" placeholder="Update Your surname">
  </div>
  <button type="submit" class="btn btn-primary mt-3" onclick="update(${index})">Update</button>
</div>`;
    document.getElementById("form").innerHTML = editForm
}

function update(index) {
    let newName = document.getElementById('newName')
    let newSurname = document.getElementById('newSurname')

    details[index] = {
        name: newName.value,
        surname: newSurname.value
    };
    setData();
    table();
    document.getElementById("form").innerHTML = form;
}



