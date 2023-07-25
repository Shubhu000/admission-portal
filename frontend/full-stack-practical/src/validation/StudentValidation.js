// StudentValidation.js
const validate = (values) => {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!values.middleName) {
    errors.middleName = "Middle Name is required";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!values.gender) {
    errors.gender = "Gender is required";
  }

  if (!values.dob) {
    errors.dob = "Date of birth is required";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.motherToungue) {
    errors.motherToungue = "Mother Tongue is required";
  }

  if (!values.hscMarks) {
    errors.hscMarks = "HSC Marks is required";
  } else if (values.hscMarks < 65 || values.hscMarks > 100) {
    errors.hscMarks = "HSC Marks should between 66 to 100";
  }

  if (values.agreedToTems === false) {
    errors.agreedToTems = "Agree Terms";
  }

  if (!values.stream) {
    errors.stream = "Stream is required";
  } else if (
    !["Computer", "Mechanical", "Electrical", "Automobile"].includes(
      values.stream
    )
  ) {
    errors.stream =
      "Invalid stream. Please select from Computer, Mechanical, Electrical, or Automobile.";
  }

  if (!values.birthPlace) {
    errors.birthPlace = "Birth Place is required";
  }

  return errors;
};

export default validate;
