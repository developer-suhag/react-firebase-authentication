import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initalizeAuthentication from "./Firebase/firebase.init";

initalizeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth();
  const handleGoogleSingIN = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleToggle = (e) => {
    setIsLogin(e.target.checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password should have 2 upper case");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Password should have 1 Special letter");
      return;
    }
    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Password should have 2 numbers");
      return;
    }

    if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
      setError("Password should have 3 lowecase");
      return;
    }
    isLogin ? loginUser(email, password) : registerNewUser(email, password);
  };

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        setSucess("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        updateName();
        setSucess("✔️ Registration Succesful");
        setError("");
        verifyEmail();
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const updateName = () => {
    updateProfile(auth.currentUser, { displayName: name }).then((result) => {});
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {});
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      setSucess("Reset Email Send");
    });
  };
  return (
    <div className="App">
      <section className="container w-50 text-white py-4 mt-5 form-section p-3 rounded-3 shadow-lg">
        <h3 className="text-white text-center">
          Please {isLogin ? "Login" : "Register"}
        </h3>
        <form onSubmit={handleRegister}>
          {!isLogin && (
            <div className="row mb-3">
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  onBlur={handleNameChange}
                  type="text"
                  className="form-control"
                  id="inputName"
                  required
                />
              </div>
            </div>
          )}
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handleEmailChange}
                type="email"
                className="form-control"
                id="inputEmail3"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handlePasswordChange}
                type="password"
                className="form-control"
                id="inputPassword3"
                required
              />
              {error ? (
                <p className="text-warning my-2">{error}</p>
              ) : (
                <p className="text-info my-2">{sucess}</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input
                  onChange={handleToggle}
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                />
                <label className="form-check-label" htmlFor="gridCheck1">
                  Already Registered?
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
          <button onClick={handlePasswordReset} className="btn btn-dark ms-4">
            Forget Password?
          </button>
        </form>
      </section>
      {/* <div>-------------------------------------</div>
      <button onClick={handleGoogleSingIN}>Google Sign In</button> */}
    </div>
  );
}

export default App;
