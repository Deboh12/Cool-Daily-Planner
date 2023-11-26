// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.



  $(function () {

    function updateDate() {
      $("#currentDay").text(dayjs().format("dddd, MMMM D"));
    }
  
    // Function to display message in the header
    function displayMessage(message) {
      $("#currentDay").append("<p class='text-success'>" + message + "</p>");
    }
  
    updateDate();
  
    // Add a listener for click events on the save button
    $(".saveBtn").on("click", function () {
      var timeBlockId = $(this).parent().attr("id");
      var eventText = $(this).siblings(".description").val();
  
      localStorage.setItem(timeBlockId, eventText);
  
      // Display message in the header
      displayMessage("Appointment added to local storage");
    });
  
    function updateHourlyBlocks() {
      // order of hours
      var hoursOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    
      // Get current hour using Day.js
      var currentHour = dayjs().hour();
    
      // Iterate through each time block
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        var blockIndex = hoursOrder.indexOf(blockHour);
        var currentIndex = hoursOrder.indexOf(currentHour);
  
        $(this).removeClass("past present future");
    
        if (blockIndex < currentIndex) {
          $(this).addClass("past");
        } else if (blockIndex === currentIndex) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Get any user input that was saved in localStorage and set the textarea values
    function loadSavedEvents() {
      $(".time-block").each(function () {
        var savedEvent = localStorage.getItem($(this).attr("id"));
        $(this).find(".description").val(savedEvent);
      });
    }
    
    updateHourlyBlocks();
    loadSavedEvents();
  
    // Update the hourly blocks every minute to reflect the current time
    setInterval(function () {
      updateHourlyBlocks();
      updateDate(); // Update the date every minute
    }, 60000);
  });