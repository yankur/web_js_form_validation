// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,
document.getElementById('email').addEventListener("change", validateEmail);
document.getElementById('name').addEventListener("change", validateName);
document.getElementById('phone').addEventListener("change", validatePhone);
document.getElementById('message').addEventListener("change", validateMessage);

function validateEmail(event) {
  event.preventDefault();

  const emailNode = document.getElementById('email');
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block');
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  validateLength(5, 50, emailNode, 'Email', emailErrors);
  validateFormat(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, true, emailNode, 'Email', emailErrors);

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

  return false;
}

function validateName(event) {
  event.preventDefault();

  const nameNode = document.getElementById('name');
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block');
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute('role', 'alert');

  validateLength(1, 1000, nameNode, 'Name', nameErrors);
  validateFormat(/^[a-zA-Z0-9]+\s*[a-zA-Z0-9]+\s*[a-zA-Z0-9]+$/, true, nameNode, 'Name', nameErrors);

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }

  return false;
}

function validatePhone(event) {
  event.preventDefault();

  const phoneNode = document.getElementById('phone');
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block');
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  validateLength(12, 100, phoneNode, 'Phone', phoneErrors);
  validateFormat(/^[+0]*[0-9]{3}[(]{0,1}[0-9]{2}[)]{0,1}[-\s\./]{0,1}[0-9]{3}[-\s\./]{0,1}[0-9]{3}[-\s\./]{0,1}[0-9]{2}$/, true, phoneNode, 'Phone', phoneErrors);

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }

  return false;
}

function validateMessage(event) {
  event.preventDefault();

  const messageNode = document.getElementById('message');
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block');
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute('role', 'alert');

  validateLength(10, 1000, messageNode, 'Message', messageErrors);
  validateFormat(/\b(ugly|dumm|stupid|pig|ignorant)\b/, false, messageNode, 'Message', messageErrors);

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }

  return false;
}

function validateLength(min, max, elNode, elName, elErrors) {
  if (elNode.value.length < min) {
    let li = document.createElement('li');
    li.innerText = elName + ' is too short';
    elErrors.appendChild(li)
  } else if (elNode.value.length > max) {
    let li = document.createElement('li');
    li.innerText = elName + ' is too long';
    elErrors.appendChild(li)
  }
}

function validateFormat(regex, match, elNode, elName, elErrors) {
  if (elNode.value.match(regex) !== match) {
    let li = document.createElement('li');
    li.innerText = elName + ' format is incorrect';
    elErrors.appendChild(li)
  }
}
