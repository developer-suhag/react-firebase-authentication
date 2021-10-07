import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initalizeAuthentication from "./Firebase/firebase.init";

initalizeAuthentication();
const googleProvider = new GoogleAuthProvider();
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const handleGoogleSingIN = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  console.log(email, password);
  return (
    <div className="App">
      <section className="container w-50 text-white py-4 mt-5 form-section p-3 rounded-3 shadow-lg">
        <h3 className="text-white text-center">Please Register</h3>
        <form onSubmit={handleRegister}>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                onBlur={handleEmailChange}
                type="email"
                class="form-control"
                id="inputEmail3"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-10">
              <input
                onBlur={handlePasswordChange}
                type="password"
                class="form-control"
                id="inputPassword3"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-10 offset-sm-2">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                />
                <label class="form-check-label" for="gridCheck1">
                  Example checkbox
                </label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </form>
      </section>
      {/* <div>-------------------------------------</div>
      <button onClick={handleGoogleSingIN}>Google Sign In</button> */}
    </div>
  );
}

export default App;
