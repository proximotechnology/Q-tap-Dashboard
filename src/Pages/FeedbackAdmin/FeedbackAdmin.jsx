import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import FeedbackDetailsModal from './FeedbackDetailsModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


export const FeedbackAdmin = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [open, setOpen] = useState(false);

    const [feedbackData, setFeedbackData] = useState([]);

    const { t } = useTranslation();

    const handleDelete = (id) => {
        setFeedbackData(feedbackData.filter(row => row.id !== id));
    };


    const handleOpen = (index) => {
        setSelectedIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedIndex(null);
    };

    // get data from backend to display in the table
    const getFeedbackData = async () => {
        try {
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/feedback', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            if (response.data) {
                setFeedbackData(response.data);
                // console.log('Fetched feedback:', response.data);
            }
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    };
    useEffect(() => {
        getFeedbackData();
    }, []);

    // delete feedback data
    const deleteFeedback = async (id) => {
        await axios.delete(`https://highleveltecknology.com/Qtap/api/feedback/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        getFeedbackData();
        toast.success(t("feedbackDeleteSucc"));
    };


    // publish feedback data

    // toggle the publishing status of the feedback
    const publishFeedback = async (id, currentStatus) => {
        const newStatus = currentStatus === "yes" ? "no" : "yes";
        // console.log('newStatus:', newStatus, currentStatus);

        await axios.put(`https://highleveltecknology.com/Qtap/api/feedback/${id}`, {
            publish: newStatus
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        getFeedbackData();
        // toast.success(`Feedback publishing status updated to ${newStatus}`);
    };
    return (
        <Box sx={{ padding: "0px 20px" }}>
            <Paper sx={{ padding: "30px 20px", borderRadius: "20px", height: "80vh" }}>
                <TableContainer>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
                        <TableHead>
                            <TableRow sx={{ height: "20px" }}>
                                <TableCell sx={{ fontSize: "12px", padding: "0px 10px", borderBottom: "1px solid gray", color: "#575756", textAlign: "left" }}>{t("client")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "0px 10px", borderBottom: "1px solid gray", color: "#575756", textAlign: "center" }}>{t("rate")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "0px 10px", borderBottom: "1px solid gray", color: "#575756", textAlign: "center" }}>{t("status")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "0px 10px", borderBottom: "1px solid gray", color: "#575756", textAlign: "center" }}>{t("goals")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "0px 10px", borderBottom: "1px solid gray", color: "#575756", textAlign: "center" }}>{t("details")}</TableCell>
                                <TableCell sx={{ fontSize: "12px", padding: "0px 10px", borderBottom: "1px solid gray", color: "#575756", textAlign: "right" }}>{t("action")}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {feedbackData.map((row, index) => (
                                <TableRow
                                    key={index} sx={{ height: "35px", }} >
                                    <TableCell
                                        sx={{
                                            fontSize: '11px',
                                            padding: "8px",

                                            textAlign: "center", alignItems: "center",
                                            borderBottom: "none", color: "#575756",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <span style={{
                                                backgroundColor: "#EBEDF3",
                                                borderRadius: "50%",
                                                display: 'flex',
                                                flexWrap:'nowrap',
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                marginRight: '8px',
                                                width: "25px",
                                                height: "25px",
                                                color: "#575756",
                                            }}>
                                                <PersonOutlineOutlinedIcon sx={{ fontSize: "15px", color: "gray" }} />
                                            </span>
                                            <span>
                                                {row.client?.name}
                                            </span>
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{
                                        padding: "8px",
                                        textAlign: "center",
                                        borderBottom: "none",
                                    }}>
                                        {[...Array(5)].map((_, index) => (
                                            index < row.star ? (
                                                <StarIcon key={index} sx={{ color: '#E57C00', fontSize: "23px", padding: "0px 2px" }} />
                                            ) : (
                                                <StarBorderIcon key={index} sx={{ color: '#E57C00', fontSize: "23px", padding: "0px 2px" }} />
                                            )
                                        ))}
                                    </TableCell>


                                    <TableCell sx={{
                                        padding: "8px",
                                        textAlign: "center",
                                        borderBottom: "none",
                                    }}>
                                        {row.emoji === 'sad' ? (<SentimentVeryDissatisfiedIcon sx={{ color: '#E02828', fontSize: "34px" }} />) :
                                            row.emoji === 'happy' ? (<SentimentSatisfiedAltIcon sx={{ color: '#FFC107', fontSize: "34px" }} />) :
                                                row.emoji === "very happy" ? (<SentimentSatisfiedAltIcon sx={{ color: '#73CB3C', fontSize: "34px" }} />) : null

                                        }

                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            padding: "8px",
                                            textAlign: "center",
                                            borderBottom: "none",
                                        }} >
                                        {row.your_goals === "yes" ? (
                                            <CheckCircleOutlineIcon sx={{ color: '#73CB3C', fontSize: "34px" }} />
                                        ) : (
                                            <CancelIcon sx={{ color: '#E02828', fontSize: "34px" }} />
                                        )}
                                    </TableCell>

                                    <TableCell
                                        sx={{
                                            padding: "8px",
                                            textAlign: "center",
                                            borderBottom: "none",
                                        }}>
                                        <IconButton onClick={() => handleOpen(index)}>
                                            <span class="icon-information" style={{ fontSize: '22px', color: "#E57C00" }} />
                                        </IconButton>
                                        <FeedbackDetailsModal open={open} handleClose={handleClose} pageId={selectedIndex} />
                                    </TableCell>


                                    <TableCell
                                        sx={{
                                            padding: "8px",
                                            textAlign: "right",
                                            borderBottom: "none",
                                        }}>
                                        <Box>
                                            <Button
                                                onClick={() => publishFeedback(row.id, row.publish)} style={{ marginLeft: "5px" }}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: row.publish === "yes" || row.publish === "Yes" ? '#808285' : '#222240',
                                                    color: 'white',
                                                    borderRadius: '20px',
                                                    textTransform: 'capitalize',
                                                    width: '90px', height: "25px",
                                                    marginRight: '10px',
                                                    fontSize: "9px", alignItems: "center",
                                                    "&:hover": {
                                                        backgroundColor: row.publish === "yes" || row.publish === "Yes" ? '#5A5A5A' : '#1A1A33',
                                                    }
                                                }} >
                                                {row.publish === "yes" || row.publish === "Yes" ? t("unpublish") : t("publish")}

                                                <span>
                                                    {row.publish === "yes" || row.publish === "Yes" ? (
                                                        <KeyboardBackspaceOutlinedIcon sx={{ color: '#E57C00', fontSize: "15px", margin: "4px 0 0 3px" }} />
                                                    ) : (
                                                        <ArrowRightAltOutlinedIcon sx={{ color: '#E57C00', fontSize: "14px", margin: "4px 0 0 3px" }} />
                                                    )}
                                                </span>
                                            </Button>

                                            <IconButton onClick={() => deleteFeedback(row.id)}>
                                                <span class="icon-delete" style={{ color: '#F44336', fontSize: '20px' }} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}
