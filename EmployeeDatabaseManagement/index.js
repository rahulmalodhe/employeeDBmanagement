(async function () {
  data = await fetch("./data.json");
  const res = await data.json();

  let employees = res;
  let selectedEmployee = employees[0];
  let selectedEmployeeId = employees[0]?.id;

  const employeelist = document.getElementById("listOfEmployees");
  const empInfo = document.getElementById("empInfo");

  //Add employee logic
  const addEmployeeBtn = document.querySelector(".addEmployeeBtn");
  const addEmployee = document.querySelector(".addEmployee");
  //form class
  const addEmployeeForm = document.querySelector(".addEmployeeContainer");

  addEmployeeBtn.addEventListener("click", () => {
    addEmployee.style.display = "flex";
  });

  addEmployee.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployee.style.display = "none";
    }
  });

  employeelist.addEventListener("click", function (e) {
    if (e.target.nodeName === "DIV" && e.target.id !== selectedEmployeeId) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderEmpInformation();
    }

    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderEmpInformation();
      }
      renderEmployees();
    }
  });

  //adding employee
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.map((value) => {
      empData[value[0]] = value[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.imageUrl = empData.imageUrl
      ? empData.imageUrl
      : "https://cdn-icons-png.flaticon.com/512/0/93.png";
    empData.age =
      new Date().getFullYear() - parseInt(empData.date.slice(0, 4), 10);
    employees.push(empData);
    renderEmployees();
    addEmployee.style.display = "none";
  });

  function renderEmployees() {
    employeelist.innerHTML = "";
    employees.map((emp) => {
      const employee = document.createElement("div");
      employee.classList.add("employeeCard");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;
      employeelist.appendChild(employee);
    });
  }

  function renderEmpInformation() {
    empInfo.innerHTML = "";
    const empInformation = document.createElement("div");
    empInformation.innerHTML = `
       <div class="empInfo">
          <img class="userImg" src=${
            selectedEmployee?.imageUrl
          } alt="user Img"/>
          <p>${selectedEmployee.firstName} ${selectedEmployee.lastName}</p>
          <p>${selectedEmployee.dob} </p>
          <p>${selectedEmployee.email}</p>
          <p>${selectedEmployee.contactNumber}</p> 
          <p>${selectedEmployee.address} </p>
          <p>Salary: ${selectedEmployee.salary * 100000} </p>
        </div>
    `;
    empInfo.appendChild(empInformation);
  }
  renderEmployees();
  renderEmpInformation();
})();
