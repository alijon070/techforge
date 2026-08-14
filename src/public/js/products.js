console.log("Products frontend javascript file");

$(function () {
  $(".product-brand").on("change", () => {
    const selectedValue = $(".product-brand").val();
    if (selectedValue === "DRINK") {
      $("#product-brand").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-brand").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id,
      productStatus = $(`#${id}.new-product-status`).val();
    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      const result = response.data;
      if (result.data) {
        console.log("Product updated!");
        $(".new-product-status").blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });

  $(".product-price").on("change", async function (e) {
    const id = $(this).data("id"),
      productPrice = $(this).val();
    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productPrice: productPrice,
      });
      const result = response.data;
      if (result.data) {
        console.log("Product updated!");
        alert("Product updated!");
        $(".product-price").blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });

  $(".product-left-count").on("change", async function (e) {
    const id = $(this).data("id"),
      productStock = $(this).val();
    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStock: productStock,
      });
      const result = response.data;
      if (result.data) {
        console.log("Product updated!");
        alert("Product updated!");
        $(".product-price").blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });
});
