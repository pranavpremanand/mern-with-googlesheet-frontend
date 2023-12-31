import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { useForm } from "react-hook-form";
import { signup } from "../../utils/apiCalls";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../StateProvider";

export const Signup = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // handle form submit
  const doSignup = async (values) => {
    dispatch({ type: "SET_LOADING", status: true });
    try {
      const response = await signup(values);
      if (response.data.success) {
        toast.success(response.data.message);
        sessionStorage.setItem("token", response.data.accessToken);
        navigate("/");
      } else {
        toast(response.data.message, { icon: "⚠️" });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch({ type: "SET_LOADING", status: false });
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(doSignup)}>
        <div className="input-box">
          <label htmlFor="">Full name</label>
          <input
            type="text"
            placeholder="Enter full name"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name should be atleast 2 characters",
              },
              maxLength: {
                value: 16,
                message: "Full name should not be more than 16 characters",
              },
              validate: (value) => {
                if (value.trim() === "") {
                  return "Full name is required";
                }
              },
            })}
          />
          <small className="error">{errors.name?.message}</small>
        </div>
        <div className="input-box">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email",
              },
            })}
          />
          <small className="error">{errors.email?.message}</small>
        </div>
        <div className="input-box">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,16}$/i,
                message:
                  "Password should be atleast 6 and maximum 16 characters and must contain uppercase, lowercase, numbers and special characters",
              },
            })}
          />
          <small className="error">{errors.password?.message}</small>
        </div>
        <button className="primary-btn" type="submit">
          Signup
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/login">
          <b>Login</b>
        </Link>
      </span>
    </div>
  );
};
