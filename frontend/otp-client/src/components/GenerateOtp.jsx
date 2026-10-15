import { useForm } from "react-hook-form";
import { generateOtp } from "../services/api";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const GenerateOtp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const emailFromRegister = location.state?.email;
  if (emailFromRegister) {
    setValue("email", emailFromRegister);
  }
  const onSubmit = async (data) => {
    try {
      const res = await generateOtp(data);
      setMessage(res.data.message);
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: data.email } });
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message || "Error");
      setSeverity("error");
      setOpen(true);
    }
  };
  return (
    <Container>
      <Typography>Generate OTP</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        ></TextField>
        <Button type="submit" variant="contained" color="primary">
          Send OTP
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
export default GenerateOtp;
