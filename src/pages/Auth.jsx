import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { mode, setMode, signUp, login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    let response =
      mode === "signup"
        ? signUp(data.email, data.password)
        : login(data.email, data.password);
    if (!response.success) {
      setError(response.type, { type: "manual", message: response.message });
    } else {
      navigate("/");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Logo */}
        <div className="auth-header">
          <div className="auth-logo">
            Shop<span>Hub</span>
          </div>
          <h1 className="auth-title">
            {mode === "signup" ? "Create an account" : "Welcome back"}
          </h1>
          <p className="auth-subtitle">
            {mode === "signup"
              ? "Sign up to start shopping today"
              : "Login to access your account"}
          </p>
        </div>

        {/* Server error */}
        {errors.login && (
          <div className="error-message" role="alert">
            {errors.login.message}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className={`form-input${errors.email ? " is-error" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="form-error" role="alert">
                ⚠ {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Min. 6 characters"
              className={`form-input${errors.password ? " is-error" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="form-error" role="alert">
                ⚠ {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large btn-block"
            onClick={() => clearErrors()}
            disabled={isSubmitting}
          >
            {mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Switch mode */}
        <div className="auth-switch">
          {mode === "signup" ? (
            <p>
              Already have an account?{" "}
              <span className="auth-link" onClick={() => setMode("login")}>
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span className="auth-link" onClick={() => setMode("signup")}>
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
