const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.geder) {
    errors.geder = "Gender is required";
  }

  if (!values.dob) {
    errors.dob = "Date of birth is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  }

  if (!values.secretId) {
    errors.secretId = "Secret ID is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.rePassword) {
    errors.rePassword = "Confirm password is required";
  }

  if (values.rePassword !== values.password) {
    errors.rePassword = "Password and confirm password do not match";
  }

  return errors;
};

export default validate;
