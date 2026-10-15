import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/api";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
const VerifyOTP = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const emailFromOtp = location.state?.email;
  const onSubmit = async (data) => {
    try {
      const res = await verifyOtp({ email: emailFromOtp, otp: data.otp });
      setMessage(res.data.message);
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMessage(err.response.data.message || "Error");
      setSeverity("error");
      setOpen(true);
    }
  };
  return (
    <Container>
      <Typography>VerifyOTP</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="OTP" fullWidth margin="normal" {...register("otp")} />
        <Button type="submit" color="primary" variant="contained">
          Verify
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
export default VerifyOTP;
