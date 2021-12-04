import {
    Button,
    Container,
    TextField,
    Typography,
    Modal,
    Box,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../utils/constants";

function Register() {
    const [modal, setModal] = useState({ isOpen: false, message: "" });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        if (!(username && password)) {
            setModal({
                isOpen: true,
                message: "Please provide username & password!",
            });
            return null;
        }

        const uri = `${API_URL}/signup`;

        axios
            .post(uri, {
                username,
                password,
            })
            .then((response) => {
                if( response.status === 201){
					setModal({
						isOpen: true,
						message: "User successfully created!",
					})
				}
            })
            .catch((error) => {
                setModal({
                    isOpen: true,
                    message: "Something went wrong!",
                });
                console.log(error);
            });
    };

    const handleModalClose = () => setModal({ isOpen: false, message: "" });

    return (
        <>
            <Container fixed maxWidth="xl" style={styles.container}>
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    style={styles.pageText}
                >
                    Register page
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    size="small"
                    placeholder="Username..."
                    style={styles.textField}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    size="small"
                    type="password"
                    placeholder="Password..."
                    style={styles.textField}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    variant="contained"
                    style={styles.loginBtn}
                    onClick={handleRegister}
                >
                    Sign up
                </Button>
                <Modal
                    open={modal.isOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.box}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h3"
                        >
                            {modal.message}
                        </Typography>
                    </Box>
                </Modal>
            </Container>
        </>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
    },
    textField: {
        width: "25%",
        paddingBottom: "35px",
    },
    loginBtn: {
        width: "20%",
        border: 20,
        backgroundColor: "#2b2d42",
    },
    pageText: {
        color: "#2b2d42",
        marginBottom: "50px",
    },
    box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "#2b2d42",
        color: "#FFF",
        border: "2px solid #252630",
        boxShadow: 24,
        p: 4,
        textAlign: "center",
    },
};

export default Register;
