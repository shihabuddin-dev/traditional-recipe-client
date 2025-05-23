import React, { use, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import Swal from "sweetalert2";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdLogin } from "react-icons/md";
import Spinner from "../../components/ui/Spinner";

const inputBase =
  "w-full border-2 border-base-content/20 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content";

const SignIn = () => {
  const { loginUser, createUserWithGoogle, setUser, user } =
    use(FirebaseAuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(location?.state || "/");
      }, 100);
    } else {
      setLoading(false);
    }
  }, [user, location, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Please enter your email address.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Please enter your password.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    loginUser(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        Swal.fire({
          icon: "success",
          title: "Sign In Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.code,
        });
      });
  };

  // google sing in
  const handleSignInWithGoogle = async () => {
    createUserWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        // Manually extract user data and set explicitly
        const userInfo = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        setUser(userInfo); // Save to context

        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Success!",
          text: "You are signed in successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1600,
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row justify-center items-center max-w-5xl">
      <title>Sign In || Traditional Recipe</title>
      <div className="flex-1">
        <DotLottieReact
          src="https://lottie.host/33baafdb-458c-4bde-ac78-8f6fc29efe18/wc1rzpJe2S.lottie"
          loop
          autoplay
        />
      </div>{" "}
      <div className="flex-1 max-w-md p-6 bg-base-100 rounded shadow border-2 border-orange-400">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex justify-center items-center gap-3 text-base-content">
          <MdLogin className="text-orange-600" />
          Sign in
        </h2>
        <form onSubmit={handleSignIn} className="space-y-2">
          <label className="block mb-2 text-sm font-medium text-base-content">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className={inputBase}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            // required removed to handle validation with SweetAlert
          />{" "}
          <label className="block mb-2 text-sm font-medium text-base-content">
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={inputBase}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              // required removed to handle validation with SweetAlert
            />
            <Link
              to="/reset-password"
              className="text-xs text-amber-600 underline"
            >
              Forget Password
            </Link>
            <span
              className="absolute right-3 top-3 cursor-pointer text-base-content/70"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="divider divider-warning">OR</p>
        <Button
          onClick={handleSignInWithGoogle}
          variant="outline"
          className="w-full mt-3 flex justify-center items-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Sign In with Google
        </Button>{" "}
        <p className="text-sm mt-4 text-base-content">
          Don&apos;t have an account?{" "}
          <Link to="/signUp" className="text-amber-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
