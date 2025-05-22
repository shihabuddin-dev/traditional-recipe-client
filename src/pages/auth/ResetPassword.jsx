import React, { useContext } from "react";
import { Link } from "react-router";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import Button from "../../components/ui/Button";
import Swal from "sweetalert2";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdLockReset } from "react-icons/md";

const ResetPassword = () => {
  const { resetPassword } = useContext(FirebaseAuthContext);

  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      //   toast.error("Please enter your email address.");
      return;
    }
    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password reset email sent! Redirecting to Gmail...",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "https://mail.google.com";
        }, 1500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/invalid-email"
        ) {
          Swal.fire({
            icon: "error",
            title: "This email address is not registered or is invalid.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to send reset email.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.error("Reset Password Error:", errorCode, errorMessage);
      });
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row justify-center items-center max-w-5xl">
      <title>Reset Password || Traditional Recipe</title>
      <div>
        <DotLottieReact
          src="https://lottie.host/51f5308c-206b-417f-881d-aa04e13b5e0f/ed3vyy5La9.lottie"
          loop
          autoplay
        />
      </div>{" "}
      <div className="bg-base-100 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md border-2 border-orange-400">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex justify-center items-center gap-3 text-base-content">
          <MdLockReset className="text-orange-600" />
          Reset Password
        </h2>
        <p className="text-center text-base-content/70 text-sm mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* Email */}
          <div>
            {" "}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-base-content mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
              className="w-full border-2 border-base-content/20 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content"
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2 py-2">
            Send Reset Link
          </Button>
          {/* Redirect to Login */}{" "}
          <div className="mt-2 text-center text-sm text-base-content">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="text-orange-600 underline font-medium"
            >
              SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
