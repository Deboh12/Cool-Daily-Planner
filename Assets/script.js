  $(function () {

      // Function to update the displayed date in the header
    function updateDate() {
      $("#currentDay").text(dayjs().format("dddd, MMMM D"));
    }
  
    // Function to display message in the header
    function displayMessage(message) {
      $("#currentDay").after("<p class='text-success'>" + message + "</p>");
    }
  
      // Initial update of the date in the header
    updateDate();
  
    // Add a listener for click events on the save button
    $(".saveBtn").on("click", function () {
          // Get the ID of the parent time block
      var timeBlockId = $(this).parent().attr("id");
      // Get the text from the textarea sibling of the clicked button
      var eventText = $(this).siblings(".description").val();
  
      // Save the event text to localStorage using the time block ID as the key
      localStorage.setItem(timeBlockId, eventText);
  
      // Display message in the header
      displayMessage("Appointment added to local storage");
    });
  
    // Function to update the styling of hourly time blocks based on the current time
    function updateHourlyBlocks() {
      // order of hours
      var hoursOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    
      // Get current hour using Day.js
      var currentHour = dayjs().hour();
    
      // Iterate through each time block
      $(".time-block").each(function () {
        // Get the hour from the time block ID
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        // Get the index of the block hour in the ordered array
        var blockIndex = hoursOrder.indexOf(blockHour);
        // Get the index of the current hour in the ordered array
        var currentIndex = hoursOrder.indexOf(currentHour);
  
        // Remove existing styling classes
        $(this).removeClass("past present future");
    
        // Add appropriate styling class based on the relationship between block and current hours
        if (blockIndex < currentIndex) {
          $(this).addClass("past");
        } else if (blockIndex === currentIndex) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  
    // Function to load saved events from localStorage and set textarea values
    function loadSavedEvents() {
      $(".time-block").each(function () {
        // Get the saved event from localStorage based on the time block ID
        var savedEvent = localStorage.getItem($(this).attr("id"));
        // Set the textarea value with the saved event text
        $(this).find(".description").val(savedEvent);
      });
    }
    
    // Initial update of hourly blocks and loading of saved events
    updateHourlyBlocks();
    loadSavedEvents();
  
    // Update the hourly blocks every minute to reflect the current time
    setInterval(function () {
      updateHourlyBlocks();
      updateDate(); // Update the date every minute
    }, 60000);
  });