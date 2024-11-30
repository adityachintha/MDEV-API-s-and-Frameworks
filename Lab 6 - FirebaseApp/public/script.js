// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc91zrfXwXUfkMhrTmTlP1FK3Z_IQkyww",
  authDomain: "project-lab6-e6fa6.firebaseapp.com",
  databaseURL: "https://project-lab6-e6fa6-default-rtdb.firebaseio.com",
  projectId: "project-lab6-e6fa6",
  storageBucket: "project-lab6-e6fa6.firebasestorage.app",
  messagingSenderId: "748712042863",
  appId: "1:748712042863:web:9a67385a109bc1f227489a",
  measurementId: "G-91WNS9KV0V",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle Sign-In
document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const response = await fetch("http://localhost:3000/firebase/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token) {
        try {
          const userCredential = await firebase
            .auth()
            .signInWithCustomToken(data.token);
          console.log("Signed in successfully:", userCredential);

          // Now retrieve the ID token after successful sign-in
          const idToken = await userCredential.user.getIdToken();
          console.log("ID Token:", idToken);

          // Store the ID token in localStorage or use it as needed
          localStorage.setItem("authToken", idToken);
          window.location.href = "welcome.html";
        } catch (error) {
          console.error("Error signing in with custom token:", error.message);
        }
      } else {
        document.getElementById("signinMessage").innerText = "No token found.";
      }
    } else {
      document.getElementById("signinMessage").innerText =
        data.error || "An unknown error occurred.";
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    document.getElementById("signinMessage").innerText =
      "An error occurred. Please try again.";
  }
});

// Handle Sign-Up
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    document.getElementById("signupMessage").innerText =
      "Account created successfully!";
  } catch (error) {
    document.getElementById("signupMessage").innerText = error.message;
  }
});
