const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password?.trim()) {
    errors.password = "Password is required";
  }
  return errors;
};
export default validate;
