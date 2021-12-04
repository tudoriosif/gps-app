import React from "react";
import { AppBar, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <AppBar position="static" style={styles.appBar}>
            <Container maxWidth="lg" style={styles.container}>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                >
                    SCD Project
                </Typography>
                <div style={styles.linkContainer}>
                    <Link to="/register" style={styles.link}>
                        <Typography
                            variant="h7"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            Register
                        </Typography>
                    </Link>
                    <Link to="/login" style={styles.link}>
                        <Typography
                            variant="h7"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            Login
                        </Typography>
                    </Link>
                </div>
            </Container>
        </AppBar>
    );
}

const styles = {
    appBar: {
        padding: "5px 0",
        backgroundColor: "#2b2d42",
        marginBottom: "5%",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    linkContainer: {
        display: "flex",
        alignItems: "center",
        width: "15%",
        justifyContent: "space-between",
    },
	link: {
		color: "#FFF",
		textDecoration: "none",
	},
};

export default Navbar;
