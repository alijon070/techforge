function validateForm() {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productStatus = $(".product-status").val(),
    productDesc = $(".product-desc").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productStatus === "" ||
    productDesc === ""
  ) {
    alert("Please insert all details");
    return false;
  } else return true;
}

// function previewFileHandler(input, order) {
//   const imgClassName = input.className,
//     file = $(`.${imgClassName}`).get(0).files[0],
//     fileType = file["type"],
//     validImageType = ["image/jpg", "image/jpeg", "image/png"];

//   if (!validImageType.includes(fileType)) {
//     alert("Please insert only jpeg, jpg and png!");
//   } else {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function () {
//         $(`#image-section-${order}`).attr("src", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// }

function previewFileHandler(input) {
  const order = input.dataset.order;
  const file = input.files[0];

  if (!file) return;

  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(file.type)) {
    alert("Please insert only jpeg, jpg and png!");
    input.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    $(`#image-section-${order}`).attr("src", reader.result);
  };

  reader.readAsDataURL(file);
}

$(".product-collection").on("change", function () {
  const selectedValue = $(this).val();

  if (selectedValue === "DRINK") {
    $("#product-size-container").hide();
    $("#product-volume").show();
  } else {
    $("#product-volume").hide();
    $("#product-size-container").show();
  }
});

function addSpecification() {
  const container = document.getElementById("specifications-container");

  const row = document.createElement("div");

  row.className = "specification-row";

  row.innerHTML = `
    <input
      type="text"
      name="specificationKey[]"
      placeholder="Specification"
      class="spec-key"
    >

    <input
      type="text"
      name="specificationValue[]"
      placeholder="Value"
      class="spec-value"
    >

    <button
      type="button"
      class="remove-spec"
      onclick="removeSpecification(this)"
    >
      ×
    </button>
  `;

  container.appendChild(row);
}

function removeSpecification(button) {
  const container = document.getElementById("specifications-container");

  // Don't allow removing the last row
  if (container.children.length <= 1) {
    return;
  }

  button.parentElement.remove();
}
