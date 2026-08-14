console.log("Signup frontend javascript file");
console.log("Signup frontend javascript file");

function validateSignUpForm() {
  const memberNick = $(".member-nick").val(),
    memberPhone = $(".member-phone").val(),
    memberPassword = $(".member-password").val(),
    memberEmail = $(".member-email"),
    confirmPassword = $(".confirm-password").val();

  if (
    memberNick == "" ||
    memberPhone == "" ||
    memberPassword == "" ||
    memberEmail == "" ||
    confirmPassword == ""
  ) {
    alert("Please fill all fields");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check");
    return false;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const password = document.querySelector(".member-password");
    const confirmPassword = document.querySelector(".confirm-password");
    const message = document.querySelector(".password-message");

    confirmPassword.addEventListener("input", () => {
      if (confirmPassword.value === "") {
        message.textContent = "";
        return;
      }

      if (password.value === confirmPassword.value) {
        message.textContent = "✓ Passwords match";
        message.style.color = "#38bdf8";
        confirmPassword.style.borderColor = "#38bdf8";
      } else {
        message.textContent = "✕ Passwords do not match";
        message.style.color = "#f87171";
        confirmPassword.style.borderColor = "#f87171";
      }
    });

    password.addEventListener("input", () => {
      if (confirmPassword.value !== "") {
        confirmPassword.dispatchEvent(new Event("input"));
      }
    });
  });
}
