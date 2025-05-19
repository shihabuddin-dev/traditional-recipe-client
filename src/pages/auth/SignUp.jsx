import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link } from "react-router";

const SignUp = () => {
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

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );
    console.log(email, password, restFormData);

    // Check if all validations pass
    const allValid = validations.every((rule) => rule.isValid);
    if (allValid) {
      console.log("all valid");
    }
  };

  return (
    <div className="bg-addCoffee">
      <form
        onSubmit={handleSignUp}
        className="max-w-md mx-auto p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <label className="block mb-2 text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none"
          placeholder="Enter your Name"
          required
        />
        <label className="block mb-2 text-sm font-medium">Address</label>
        <input
          type="text"
          name="address"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none"
          placeholder="Enter your Address"
          required
        />
        <label className="block mb-2 text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none"
          placeholder="Enter your Phone"
          required
        />
        <label className="block mb-2 text-sm font-medium">Photo URL</label>
        <input
          type="text"
          name="photo"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none"
          placeholder="Enter your Photo URL"
          required
        />
        <label className="block mb-2 text-sm font-medium">Email address</label>
        <input
          type="email"
          name="email"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full border rounded px-3 py-2 focus:outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-600"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-sm mt-4">
          <p className="font-medium mb-2">Create a password that:</p>
          <ul className="space-y-1">
            {validations.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className={`w-4 h-4 flex items-center justify-center border rounded-sm ${
                    rule.isValid ? "bg-green-500 text-white" : "border-gray-400"
                  }`}
                >
                  {rule.isValid ? "✓" : ""}
                </span>
                <span>{rule.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Sign Up
        </Button>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signIn" className="text-blue-600 underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
