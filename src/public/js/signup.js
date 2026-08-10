console.log("Signup frontend javascript file");
console.log("Signup frontend javascript file");

// $(function () {
//   const fileTarget = $(".file-box .upload-hidden");
//   console.log(fileTarget);
//   let filename;

//   fileTarget.on("change", function () {
//     if (window.FileReader) {
//       const uploadFile = $(this)[0].files[0];
//       console.log(uploadFile);
//       const fileType = uploadFile["type"];
//       const validImageType = ["image/jpg", "image/jpeg", "image/png"];
//       if (!validImageType.includes(fileType)) {
//         alert("Please insert only jpeg, jpg and png!");
//       } else {
//         if (uploadFile) {
//           console.log(URL.createObjectURL(uploadFile));
//           $(".upload-img-frame")
//             .attr("src", URL.createObjectURL(uploadFile))
//             .addClass("success");
//         }
//         filename = $(this)[0].files[0].name;
//       }
//       $(this).siblings(".upload-name").val(filename);
//     }
//   });
// });

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

  //   const password = $(".member-password");
  //   const confirmPassword = $(".confirm-password");
  //   const message = $("#password-message");

  //   function checkPassword() {
  //     if (confirmPassword.value === "") {
  //       message.textContent = "";
  //       confirmPassword.classList.remove("valid", "invalid");
  //       return;
  //     }

  //     if (password.value === confirmPassword.value) {
  //       message.textContent = "✓ Passwords match";
  //       message.classList.add("valid");
  //       message.classList.remove("invalid");

  //       confirmPassword.classList.add("valid");
  //       confirmPassword.classList.remove("invalid");
  //     } else {
  //       message.textContent = "✕ Passwords do not match";
  //       message.classList.add("invalid");
  //       message.classList.remove("valid");

  //       confirmPassword.classList.add("invalid");
  //       confirmPassword.classList.remove("valid");
  //     }
  //   }

  //   password.addEventListener("input", checkPassword);
  //   confirmPassword.addEventListener("input", checkPassword);

  //   const memberImage = $(".member-image").get(0)?.files[0]?.name
  //     ? $(".member-image").get(0).files[0].name
  //     : null;
  //   if (!memberImage) {
  //     alert("Please insert restaurant image!");
  //     return false;
  //   }
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
