/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { API_URL, axiosConfig } from "../utils/constants";
import GoogleMap from "./GoogleMap";

function Dashboard({ token }) {
    const [loading, setLoading] = useState(true);
    const [terminalId, setTerminalId] = useState("");
    const [availableTerminals, setAvailableTerminals] = useState([]);
    const [positions, setPositions] = useState([]);
    const [date, setDate] = useState({ startDate: "", endDate: "" });

    const config = axiosConfig(token);

    useEffect(() => {
        const uri = `${API_URL}/positions`;
        axios
            .get(uri, config)
            .then((response) => response.data)
            .then((data) => data.map((obj) => obj.terminalId))
            .then((terminalsId) => {
                setAvailableTerminals([...new Set(terminalsId)]);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!(date.startDate && date.endDate && terminalId)) return null;

        setLoading(true);

        const uri = `${API_URL}/positions/${terminalId}?startDate=${date.startDate}&endDate=${date.endDate}`;

        axios
            .get(uri, config)
            .then((response) => response.data)
            .then((data) => {
                const newData = new Set(
                    data
                        .map((entry) => ({
                            lat: entry.latitude,
                            lng: entry.longitude,
                        }))
                        .map(JSON.stringify)
                );
                setPositions([...newData].map(JSON.parse));
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [date.endDate]);

    if (loading) return <CircularProgress style={styles.loading} />;


    return (
        <>
            <Container fixed maxWidth="xl" style={styles.container}>
                <Container fixed maxWidth="lg" style={styles.dataContainer}>
                    <FormControl sx={{ minWidth: 140 }}>
                        <InputLabel>Terminals</InputLabel>
                        <Select
                            value={terminalId}
                            label="Terminal ID"
                            onChange={(event) =>
                                setTerminalId(event.target.value)
                            }
                        >
                            {availableTerminals?.map((terminal, index) => (
                                <MenuItem value={terminal} key={index}>
                                    {terminal}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start date"
                            value={date.startDate}
                            onChange={(newStartDate) => {
                                setDate({
                                    ...date,
                                    startDate: newStartDate.$d,
                                });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DatePicker
                            label="End date"
                            value={date.endDate}
                            onChange={(newEndDate) => {
                                setDate({ ...date, endDate: newEndDate.$d });;
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Container>
                <Container fixed maxWidth="lg" style={styles.googleContainer}>
                   { !!positions.length && <GoogleMap positions={positions}/> }
                </Container>
            </Container>
        </>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    dataContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 10,
    },
    loading: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#2b2d42",
    },
    googleContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "10%",
    },
};

export default Dashboard;
