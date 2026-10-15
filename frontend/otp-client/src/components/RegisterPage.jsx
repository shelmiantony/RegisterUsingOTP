import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const Registerpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      setMessage(res.data.message);
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        navigate("/generate-otp", { email: data.email });
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message || "Error");
      setSeverity("error");
      setOpen(true);
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <TextField
          type="email"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          type="password"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[A-Z]).*$/,
                message:
                  "Password must contain at least one number and one uppercase letter",
              },
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        ></TextField>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default Registerpage;
