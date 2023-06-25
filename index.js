$(document).ready(function() {  //waits for document to be loaded before excuting code inside function
    let admissions = []; //intializes empty array
  
    // Render admissions
    function renderAdmissions() { //renders the admissions on the page
      $('#admissionList').empty(); //clears the existing content of the admission list table
  
      admissions.forEach(function(admission) { //creates HTML elements to represent each admission's data
        let row = $('<tr></tr>');
        let studentName = $('<td></td>').text(admission.studentName);
        let course = $('<td></td>').text(admission.course);
        let actions = $('<td></td>');
  
        //creates an edit button element and attaches a click event listener to it.
        let editButton = $('<a href="" class="btn btn-warning btn-sm edit">Edit</a>');
        editButton.click(function(event) {
          event.preventDefault();//stops the button's usual action and uses the updateAdmission function to update the admission associated with that button.
          updateAdmission(admission);
        });
        
        //creates a delete button element and attaches a click event listener to it
        let deleteButton = $('<a href="" class="btn btn-danger btn-sm delete">Delete</a>');
        deleteButton.click(function(event) {
          event.preventDefault(); //stops the button's usual action and uses the deleteAdmission function to delete the admission associated with that button.
          deleteAdmission(admission);
        });
  
        //appends the created elements, to their respective parent elements.
        actions.append(editButton);
        actions.append(deleteButton);
  
        row.append(studentName);
        row.append(course);
        row.append(actions);
  
        $('#admissionList').append(row);
      });
    }
  
    // Adds a new admission, when the form is submitted, retrieves the values, adds to admissions array
    $('#admissionForm').submit(function(event) { //attaches a submit event listener
      event.preventDefault();
  
      let studentName = $('#studentName').val();
      let course = $('#course').val();
  
      let newAdmission = {
        studentName: studentName,
        course: course
      };
  
      admissions.push(newAdmission);
      renderAdmissions(); //function to update the admissions list on the page and clear input fields
  
      $('#studentName').val('');
      $('#course').val('');
    });
  
    // Delete an admission when delete button hit
    function deleteAdmission(admission) {
      admissions = admissions.filter(function(item) {
        return item !== admission;
      });
  
      renderAdmissions(); //function to update the admission list on the page
    }
  
    // Update an admission when the edit button hit
    function updateAdmission(admission) { //
      let newStudentName = prompt('Enter updated student name:', admission.studentName);
      let newCourse = prompt('Enter updated course:', admission.course);
  
      admission.studentName = newStudentName !== null ? newStudentName : admission.studentName;
      admission.course = newCourse !== null ? newCourse : admission.course;
      // If the user enters a new value, it updates the corresponding admission's properties. If the user cancels the prompt, the existing values are kept
  
      renderAdmissions(); //function to update the admission list on the page
    }
  
    // Initial render, combines the use of event listeners, DOM manipulation, and rendering functions
    renderAdmissions();
  });
  