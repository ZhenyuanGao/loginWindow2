export default function validateInfo({ email, password }) {
  let errors = {};

  if (!email.trim()) {
    errors.username = " email required";
  }
  if (email.indexOf("@") === -1) {
    errors.email = " email is not valid";
  }

  if (password.length < 6) {
    errors.password = " password is not valid";
  }
  /*
  if (!values.email) {
    errors.email = "email required.";
  }
*/
  return errors;
}
