$(function () {
  // Function to update the displayed date in the header
  function updateDate() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  }

  // Function to display a message in the header
  function displayMessage(message, isSuccess) {
    var messageClass = isSuccess ? 'text-success' : 'text-danger';
    var messageElement = $("<p>").addClass(messageClass).text(message);
    $("#currentDay").after(messageElement);
  }

  // Initial update of the date in the header
  updateDate();

  // Function to generate time blocks
  function generateTimeBlocks() {
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $('<div>').attr('id', 'hour-' + hour).addClass('row time-block');
      var displayHour = (hour === 12) ? "12 PM" : (hour > 12) ? (hour - 12) + " PM" : hour + " AM";

      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass('future');
      }

      var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour);
      var textarea = $('<textarea>').addClass("col-8 col-md-10 description").attr('rows', 3);
      var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>').attr('id', hour).on('click', function (e) {
        saveText(this.getAttribute('id'))
      });

      timeBlock.append(hourDiv);
      timeBlock.append(textarea);
      timeBlock.append(saveButton);
      $("#time-block-container").append(timeBlock);
    }
  }

  // Function to save the text input into local storage
  function saveText(hour) {
    var textarea = $("#hour-" + hour).find("textarea")[0];
    var text = textarea.value.trim();

    // If statement that checks if the text is not empty
    if (text !== "") {
      localStorage.setItem("hour-" + hour, text);
      displayMessage("Appointment added to local storage ✅", true);
    }
  }

  // Function to load the saved text from local storage and display it on the page
  function loadSavedText() {
    for (var hour = 9; hour <= 17; hour++) {
      var text = localStorage.getItem("hour-" + hour);
      var textarea = $("#hour-" + hour).find("textarea")[0];

      if (text) {
        textarea.value = text;
      }
    }
  }

  // Generate time blocks and load saved text when the page loads
  generateTimeBlocks();
  loadSavedText();

  // Update the hourly blocks every minute to reflect the current time
  setInterval(function () {
    updateDate();
  }, 60000);
});