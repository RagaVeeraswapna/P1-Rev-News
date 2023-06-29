document.getElementById("username").innerText = currentUser.username;
document.getElementById("email").innerText = currentUser.email;
document.getElementById("country").innerText = currentUser.country;
document.getElementById("phoneNumber").innerText = currentUser.phone_number;

var cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener("click", function () {
  window.location.href = "news.html";
});

document
  .getElementById("updateButton")
  .addEventListener("click", openUpdateModal);

function openUpdateModal() {
  document.getElementById("newUsername").value = currentUser.username;
  document.getElementById("newEmail").value = currentUser.email;
  document.getElementById("newPhoneNumber").value = currentUser.phone_number;
  document.getElementById("newCountry").value = currentUser.country;

  const updateModal = new bootstrap.Modal(
    document.getElementById("updateModal")
  );
  updateModal.show();
}

async function updateProfile() {
  const newPhoneNum = document.getElementById("newPhoneNumber").value;
  const newUsername = document.getElementById("newUsername").value;
  const newEmail = document.getElementById("newEmail").value;
  const newCountry = document.getElementById("newCountry").value;

  try {
    const url = `${API_URL}/users/${currentUser.id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUsername,
        email: newEmail,
        country: newCountry,
        phone_number: newPhoneNum,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    document.getElementById("newPhoneNumber").value = data.phone_number;
    document.getElementById("newUsername").value = data.username;
    document.getElementById("newEmail").value = data.email;
    document.getElementById("newCountry").value = data.country;

    console.log(data);
    alert("Profile information updated successfully");
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the profile information");
  }
  window.location.reload();
}

document
  .getElementById("deleteProfile")
  .addEventListener("click", deleteProfile(currentUser.id));

async function deleteProfile(userId) {
  try {
    const deleteButton = document.getElementById("deleteProfile");
    deleteButton.addEventListener("click", async () => {
      const confirmed = confirm(
        "Are you sure you want to delete this profile?"
      );
      if (!confirmed) {
        return;
      }

      const url = `${API_URL}/users/${userId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        // throw new Error("Failed to delete profile");
        window.location.href = "login.html";
        alert("Profile deleted successfully");
      }
      // alert("Profile deleted successfully");
      // window.location.href = "login.html";
    });
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while deleting the profile");
  }
}

document
  .getElementById("resetButton")
  .addEventListener("click", openResetModal);

function openResetModal() {
  // document.getElementById("oldPassword").value = currentUser.password;
  const resetModal = new bootstrap.Modal(document.getElementById("resetModal"));
  resetModal.show();
}

async function resetPassword() {
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newResetPassword").value.trim();
  const confirmPassword = document
    .getElementById("newConfirmedResetPassword")
    .value.trim();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    alert(
      "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
    );
    return;
  }
  // const phoneNumberRegex = /^\d{10}$/;
  // if (!phoneNumberRegex.test(phone_number)) {
  //   alert("Phone number should be a 10-digit number.");
  //   return;
  // }
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  } else {
    try {
      const url = `${API_URL}/users/${currentUser.id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!response.ok) {
        throw new Error("Failed to reset password");
      }
      const data = await response.json();
      document.getElementById("oldPassword").value = data.password;
      console.log(data);
      alert("Password reset successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while resetting the password");
    }
  }
  window.location.reload();
}
