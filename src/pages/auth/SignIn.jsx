import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import Swal from "sweetalert2";
import Spinner from "../../components/ui/Spinner";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const inputBase =
  "w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200";

const SignIn = () => {
  const { loginUser, createUserWithGoogle, user, setUser } =
    use(FirebaseAuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  if (user) {
    return (
      <>
        <Spinner />
        <Navigate to="/" />
      </>
    );
  }
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    loginUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        setUser(currentUser);
        Swal.fire({
          icon: "success",
          title: "Sign In Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location?.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorCode,
        });
      });
  };

  const handleSingInWithGoogle = () => {
    createUserWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);

        const userProfile = {
          name: currentUser?.displayName,
          email: currentUser?.email,
          photo: currentUser?.photoURL,
        };

        // Check if user already exists before saving
        fetch(`http://localhost:3000/users?email=${currentUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.exists) {
              // Save to DB if not exists
              fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userProfile),
              })
                .then((res) => res.json())
                .then((saveResult) => {
                  if (saveResult.insertedId) {
                    showLoginSuccess();
                  }
                });
            } else {
              // Just log in if already exists
              showLoginSuccess();
            }
          });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.code, error.message);
      });
  };

  const showLoginSuccess = () => {
    navigate(`${location?.state ? location.state : "/"}`);
    Swal.fire({
      title: "Success!",
      text: "Your Account Sign In Successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1600,
    });
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row justify-center items-center max-w-5xl ">
      <div className="flex-1">
        <DotLottieReact
          src="https://lottie.host/33baafdb-458c-4bde-ac78-8f6fc29efe18/wc1rzpJe2S.lottie"
          loop
          autoplay
        />
      </div>
      <div className="flex-1 max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Sign in
        </h2>

        <form onSubmit={handleSignIn} className="space-y-2">
          <label className="block mb-2 text-sm font-medium">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className={inputBase}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={inputBase}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <Link
              to="/reset-password"
              className="text-xs text-amber-600 underline"
            >
              Forget Password
            </Link>
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-500">----- or -----</p>

        <Button
          onClick={handleSingInWithGoogle}
          variant="outline"
          className="w-full mt-3 flex justify-center items-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </Button>

        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-amber-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
