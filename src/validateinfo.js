export default function validateInfo({ email, password, promo }) {
  let errors = { full_check: false };
  let format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
  /*
  if(format.test(string)){
    return true;
  } else {
    return false;
  }
  */

  if (!email.trim()) {
    errors.username = " email required";
  }
  if (
    email.indexOf("@") === -1 ||
    !email.trim() ||
    format.test(email) === true
  ) {
    errors.email = " Please insert a valid email";
  }

  if (password.length < 6) {
    errors.password = " password is not valid";
  } else {
    errors.full_check = true;
  }

  return errors;
}
