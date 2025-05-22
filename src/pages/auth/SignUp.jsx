import React, { use, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import { FcGoogle } from "react-icons/fc";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { GiArchiveRegister } from "react-icons/gi";
import Spinner from "../../components/ui/Spinner";

const inputBase =
  "w-full border-2 border-base-content/20 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content";

const SignUp = () => {
  const { createUser, setUser, createUserWithGoogle, updateUser, user } =
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

  const validations = [
    {
      label: "contains at least 6 characters",
      isValid: password.length >= 6,
    },
    {
      label: "contains both lower (a-z) and upper case letters (A-Z)",
      isValid: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      label: "contains at least one number (0-9) or a symbol",
      isValid: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      label: "does not contain your email address",
      isValid: email && !password.includes(email),
    },
  ];

  // Sign up with email/password
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, email, password, photo } = Object.fromEntries(
      formData.entries()
    );

    const allValid = validations.every((rule) => rule.isValid);
    if (!allValid) {
      Swal.fire({
        icon: "error",
        title: "Password doesn't meet all requirements",
        showConfirmButton: false,
        timer: 1600,
      });
      return;
    }

    // Create Firebase user
    createUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        updateUser({ displayName: name, photoURL: photo });

        setUser({ ...currentUser, displayName: name, photoURL: photo });

        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Success!",
          text: "Your Account created Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1600,
        });
        form.reset();
      })
      .catch((error) => {
        let errorMsg = error.message;
        if (error.code === "auth/email-already-in-use") {
          errorMsg =
            "This email is already registered. Please use a different email or sign in.";
        }
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorMsg,
        });
      });
  };

  // Google Sign In
  const handleSingInWithGoogle = async () => {
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

        // console.log("Google user info:", userInfo);

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
      <title>Sign Up || Traditional Recipe</title>
      <div className="flex-1">
        <DotLottieReact
          src="https://lottie.host/a90ff9b8-cd22-4529-a711-c0b7d3f147c4/WduH1EXw54.lottie"
          loop
          autoplay
        />
        <DotLottieReact
          src="https://lottie.host/33baafdb-458c-4bde-ac78-8f6fc29efe18/wc1rzpJe2S.lottie"
          loop
          autoplay
        />
      </div>{" "}
      <form
        onSubmit={handleSignUp}
        className="flex-1 max-w-md p-6 bg-base-100 rounded shadow space-y-2 border-2 border-orange-400"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 flex justify-center items-center gap-3 text-base-content">
          <GiArchiveRegister className="text-orange-600" /> Sign Up
        </h2>
        <label className="block mb-2 text-sm font-medium text-base-content">
          Name
        </label>
        <input
          type="text"
          name="name"
          className={inputBase}
          placeholder="Enter your Name"
          required
        />
        <label className="block mb-2 text-sm font-medium text-base-content">
          Photo URL
        </label>
        <input
          type="text"
          name="photo"
          className={inputBase}
          placeholder="Enter your Photo URL"
          required
        />
        <label className="block mb-2 text-sm font-medium text-base-content">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className={inputBase}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />
        <label className="block mb-2 text-sm font-medium text-base-content">
          Password
        </label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={inputBase}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-base-content/70"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* Password Validation List */}{" "}
        <div className="text-sm mt-4 text-base-content">
          <p className="font-medium mb-2">Create a password that:</p>
          <ul className="space-y-1">
            {validations.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className={`w-4 h-4 flex items-center justify-center border rounded-sm ${
                    rule.isValid
                      ? "bg-green-500 text-white"
                      : "border-base-300 text-red-500"
                  }`}
                >
                  {rule.isValid ? "✓" : "X"}
                </span>
                <span className="text-base-content">{rule.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Sign Up
        </Button>
        <p className="divider divider-warning">OR</p>
        <Button
          onClick={handleSingInWithGoogle}
          variant="outline"
          className="w-full mt-3 flex justify-center items-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </Button>{" "}
        <p className="text-sm mt-4 text-base-content">
          Already have an account?{" "}
          <Link to="/signIn" className="text-amber-600 underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
