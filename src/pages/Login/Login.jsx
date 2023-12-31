import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { login } from "../../utils/apiCalls";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../StateProvider";

export const Login = () => {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle form submit
  const doLogin = async (values) => {
    dispatch({ type: "SET_LOADING", status: true });
    try {
      const response = await login(values);
      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.data.isAdmin) {
          sessionStorage.setItem("adminToken", response.data.accessToken);
          navigate("/admin");
        } else {
          sessionStorage.setItem("token", response.data.accessToken);
          navigate("/");
        }
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
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(doLogin)}>
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
          Login
        </button>
      </form>
      <span>
        Don't have an account?
        <Link to="/signup">
          <b>Signup</b>
        </Link>
      </span>
    </div>
  );
};
