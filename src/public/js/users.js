console.log("Users frontend javascript file");
document.addEventListener("DOMContentLoaded", () => {
  const statusSelects = document.querySelectorAll(".member-status");

  statusSelects.forEach((select) => {
    select.addEventListener("change", async (e) => {
      const target = e.target;

      const memberId = target.dataset.id;
      const memberStatus = target.value;

      if (!memberId) {
        console.error("Member ID is missing");
        return;
      }

      try {
        const response = await fetch("/admin/user/edit", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            _id: memberId,
            memberStatus: memberStatus,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to update user");
        }

        console.log("User updated:", result);
      } catch (err) {
        console.error("Update user error:", err);

        alert("Failed to update user status");
      }
    });
  });
});
