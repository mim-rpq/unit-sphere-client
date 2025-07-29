import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthContext';
import Spinner from '../Shared/Spinner';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { signIn, setUser, user, userLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('Login successful!');
        navigate(location.state?.from || '/');
      })
      .catch((error) => {
        const code = error.code;
        if (code === 'auth/invalid-credential') {
          toast.error('Invalid email or password. Please try again.');
        } else if (code === 'auth/user-not-found') {
          toast.error('No account found with this email address.');
        } else if (code === 'auth/wrong-password') {
          toast.error('Incorrect password.');
        } else if (code === 'auth/invalid-email') {
          toast.error('Invalid email format.');
        } else if (code === 'auth/too-many-requests') {
          toast.error('Too many attempts. Try again later.');
        } else {
          toast.error('Something went wrong. Try again later.');
        }
      });
  };

  if (userLoading && user) return <Spinner />;

  return (
    <div className="m-5 flex justify-center min-h-screen my-6 md:my-20 lg:my-0 items-center">
      <div className="py-5 bg-white p-2 w-full max-w-md shadow-2xl">
        <h2 className="md:text-4xl text-2xl font-bold text-center py-5 text-primary">
          Please Login!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label text-md">Email</label>
            <input
              type="email"
              className={`border text-md focus:outline-none border-primary py-4 rounded-md placeholder-gray-300 px-3 ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <label className="label text-md mt-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`border border-primary text-md focus:outline-none w-full py-4 rounded-md placeholder-gray-300 px-3 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message: 'Password must have uppercase and lowercase letters',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute mt-4 top-1/2 right-6 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FaEyeSlash size={15} color="black" />
                ) : (
                  <FaEye size={15} color="black" />
                )}
              </button>
            </div>

            <div className="mt-1">
              <a className="link link-hover text-secondary underline underline-offset-1">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn mt-4 bg-primary hover:bg-secondary outline-0 text-white"
            >
              Login
            </button>
          </fieldset>
        </form>

        <SocialLogin />

        <p className="font-semibold text-center mt-3 text-primary">
          Don't have an account? Please{' '}
          <Link to="/auth/register" className="text-secondary underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
