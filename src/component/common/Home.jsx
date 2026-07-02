import React, { useState } from "react";
import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slice/userSlice";
import { toast } from "react-toastify";

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = { email, password };

            const response = await dispatch(loginUser(data)).unwrap();

            // console.log("LOGIN RESPONSE:", response);

            if (response?.success) {
                toast.success("User Authenticated !")
                navigate("/f");

            } else {
                setError(response?.message || "Login failed");
            }

        } catch (err) {
            console.log("LOGIN ERROR:", err);
            toast.error("Invalid Credetials !")
            setError(err?.message || "Server error. Try again.");
        }
    };

    return (
        <Box className="wrapper">
            {/* 🍃 leaves */}
            <div className="leaves">
                {[...Array(15)].map((_, i) => (
                    <span key={i}></span>
                ))}
            </div>

            <Container maxWidth="sm">
                <Card className="card">
                    <Typography variant="h5" fontWeight="bold" color="#0ea5e9">
                        GESWA
                    </Typography>

                    <Typography variant="h6" fontWeight="600" mt={1}>
                        Health Insurance Admin Panel
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
                        Secure access for authorized personnel only
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="current-email"
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                               autoComplete="current-password"
                        />

                        <Button type="submit" fullWidth variant="contained" className="btn">
                            Login to Dashboard
                        </Button>
                    </form>
                </Card>
            </Container>

            {/* CSS */}
            <style>{css}</style>
        </Box>
    );
}

/* ---------------- CSS ---------------- */

const css = `
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #0ea5e9);
  overflow: hidden;
  position: relative;
}

/* leaves container */
.leaves {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

/* leaf shape */
.leaves span {
  position: absolute;
  width: 18px;
  height: 18px;
  background: rgba(8, 73, 43, 0.8);
  border-radius: 0 100% 0 100%;
  transform: rotate(45deg);
  animation: fall 8s linear infinite;
}

/* random placement */
.leaves span:nth-child(1) { left: 5%; animation-delay: 0s; }
.leaves span:nth-child(2) { left: 15%; animation-delay: 1s; }
.leaves span:nth-child(3) { left: 25%; animation-delay: 2s; }
.leaves span:nth-child(4) { left: 35%; animation-delay: 3s; }
.leaves span:nth-child(5) { left: 45%; animation-delay: 4s; }
.leaves span:nth-child(6) { left: 55%; animation-delay: 1.5s; }
.leaves span:nth-child(7) { left: 65%; animation-delay: 2.5s; }
.leaves span:nth-child(8) { left: 75%; animation-delay: 3.5s; }
.leaves span:nth-child(9) { left: 85%; animation-delay: 0.5s; }
.leaves span:nth-child(10) { left: 95%; animation-delay: 2s; }
.leaves span:nth-child(11) { left: 10%; animation-delay: 4s; }
.leaves span:nth-child(12) { left: 20%; animation-delay: 1s; }
.leaves span:nth-child(13) { left: 30%; animation-delay: 3s; }
.leaves span:nth-child(14) { left: 60%; animation-delay: 2s; }
.leaves span:nth-child(15) { left: 80%; animation-delay: 1s; }

@keyframes fall {
  0% {
    top: -10%;
    opacity: 0;
    transform: translateX(0) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  100% {
    top: 110%;
    transform: translateX(40px) rotate(360deg);
    opacity: 0;
  }
}

/* card */
.card {
  padding: 40px;
  border-radius: 16px !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
  text-align: center;
  position: relative;
  z-index: 2;
}

/* button */
.btn {
  margin-top: 20px !important;
  background-color: #0ea5e9 !important;
  font-weight: bold !important;
}

.btn:hover {
  background-color: #0284c7 !important;
}
`;

export default Home;