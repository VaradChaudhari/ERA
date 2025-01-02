// Check if the departments are saved in localStorage
if (!localStorage.getItem('departments')) {
    localStorage.setItem('departments', JSON.stringify([])); // Initialize empty departments
  }
  
  const departments = JSON.parse(localStorage.getItem('departments'));
  
  const addDepartmentForm = document.getElementById('addDepartmentForm');
  const departmentNameInput = document.getElementById('departmentName');
  const addEmployeeForm = document.getElementById('addEmployeeForm');
  const employeeNameInput = document.getElementById('employeeName');
  const phone1Input = document.getElementById('phone1');
  const phone2Input = document.getElementById('phone2');
  const departmentsList = document.getElementById('departmentsList');
  const addEmployeeFormContainer = document.getElementById('addEmployeeFormContainer');
  
  // Load departments and display them
  function loadDepartments() {
    departmentsList.innerHTML = ''; // Clear the existing list
    departments.forEach((department, index) => {
      const departmentDiv = document.createElement('div');
      departmentDiv.classList.add('department');
      departmentDiv.innerHTML = `
        <h4>${department.name}</h4>
        <button class="btn btn-secondary" onclick="showEmployeeForm(${index})">Add Employee</button>
        <button class="btn btn-danger" onclick="confirmRemoveDepartment(${index})">Delete Department</button>
        
        <!-- Search Employee Form -->
        <div class="mb-3">
          <input type="text" class="form-control" id="searchEmployeeInput-${index}" placeholder="Search Employee" oninput="searchEmployee(${index})">
        </div>
        
        <div class="employees" id="employeesList-${index}">
          ${department.employees.map((e, empIndex) => `
            <div class="employee">
              ${e.name} - ${e.phone1}, ${e.phone2}
              <button class="btn btn-danger btn-sm" onclick="confirmRemoveEmployee(${index}, ${empIndex})">Delete</button>
            </div>
          `).join('')}
        </div>
      `;
      departmentsList.appendChild(departmentDiv);
    });
  }
  
  // Show the employee form for a department
  function showEmployeeForm(departmentIndex) {
    addEmployeeFormContainer.style.display = 'block';
    addEmployeeForm.onsubmit = function(event) {
      event.preventDefault();
      addEmployee(departmentIndex);
    };
  }
  
  // Add a new department
  addDepartmentForm.onsubmit = function(event) {
    event.preventDefault();
    const newDepartment = {
      name: departmentNameInput.value,
      employees: []
    };
    departments.push(newDepartment);
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    departmentNameInput.value = ''; // Clear input
    loadDepartments();
  };
  
  // Add an employee to a department
  function addEmployee(departmentIndex) {
    const employee = {
      name: employeeNameInput.value,
      phone1: phone1Input.value,
      phone2: phone2Input.value
    };
    departments[departmentIndex].employees.push(employee);
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    employeeNameInput.value = '';
    phone1Input.value = '';
    phone2Input.value = '';
    loadDepartments();
  }
  
  // Search through employees in a department
  function searchEmployee(departmentIndex) {
    const searchInput = document.getElementById(`searchEmployeeInput-${departmentIndex}`).value.toLowerCase();
    const employeeList = document.getElementById(`employeesList-${departmentIndex}`);
    const employees = employeeList.getElementsByClassName('employee');
  
    for (let i = 0; i < employees.length; i++) {
      const employeeName = employees[i].textContent.toLowerCase();
      if (employeeName.includes(searchInput)) {
        employees[i].style.display = 'block';
      } else {
        employees[i].style.display = 'none';
      }
    }
  }
  
  // Show confirmation dialog to delete department
  function confirmRemoveDepartment(departmentIndex) {
    const confirmed = window.confirm("Are you sure you want to delete this department?");
    if (confirmed) {
      removeDepartment(departmentIndex);
    }
  }
  
  // Show confirmation dialog to delete employee
  function confirmRemoveEmployee(departmentIndex, employeeIndex) {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      removeEmployee(departmentIndex, employeeIndex);
    }
  }
  
  // Remove a department
  function removeDepartment(departmentIndex) {
    departments.splice(departmentIndex, 1); // Remove the department from the array
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    loadDepartments();
  }
  
  // Remove an employee from a department
  function removeEmployee(departmentIndex, employeeIndex) {
    departments[departmentIndex].employees.splice(employeeIndex, 1); // Remove the employee
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    loadDepartments();
  }
  
  // Initially load all departments
  loadDepartments();
  