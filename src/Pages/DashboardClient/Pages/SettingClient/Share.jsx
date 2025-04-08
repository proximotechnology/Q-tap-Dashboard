import { Button, Divider, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';

export const Share = () => {
    const qrCodeRef = useRef();
    const {t} = useTranslation();
    const handleCopyLink = () => {
        const link = "https://highleveltecknology.com/";
        navigator.clipboard.writeText(link)
            .then(() => alert(t("linkCopied")))
            .catch((error) => alert(t("faildToCopyLink"), error));
    };

    const handleDownloadQRCode = () => {
        if (qrCodeRef.current) {
            const svgElement = qrCodeRef.current;
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'qrcode.svg';
            downloadLink.click();

            URL.revokeObjectURL(url);
        }
    };
    return (
        <Paper style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px', overflowX:'auto',whiteSpace:'nowrap' }}>
            <Box
                sx={{
                    maxWidth: '100%',
                    padding: "15px"
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "left",
                        fontSize: "18px",
                        color: "#575756",
                        display: 'flex',
                        alignItems: "center"
                    }}
                >
                    <span class="icon-send" style={{ fontSize: "23px", color: "#D8E0E0", marginRight: "6px" }}></span>
                    {t("shareMenu")}
                </Typography>
                <Divider
                    sx={{
                        backgroundImage: 'linear-gradient(to right, #FDB913, #F2672E)',
                        height: '2px',
                        marginTop: '2px',
                        border: 'none',
                    }}
                />

                <div style={{ textAlign: 'center', padding: "70px 0px" }}>
                    <Box
                        sx={{
                            border: "4px solid #ef7d00",
                            padding: '10px',
                            borderRadius: '20px',
                            display: "flex",
                            width: "18%",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                             minWidth:'200px',
                             marginX:'auto'
                        }}
                    >
                        <QRCodeSVG
                            ref={qrCodeRef}
                            value="https://highleveltecknology.com/"
                            size={156}
                            fgColor="#000000"
                            bgColor="#FFFFFF"
                            level="Q"
                        />
                    </Box>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Button
                            onClick={handleCopyLink}
                            style={{
                                backgroundColor: '#ef7d00',
                                textTransform: "capitalize",
                                borderRadius: "20px",
                                color: 'white',
                                padding: '5px 25px',
                                fontSize: "12px"
                            }}
                        >
                            <span className="icon-link" style={{ marginRight: "6px", fontSize: "16px" }} />
                            {t("copyLink")}
                        </Button>

                        <Button
                            onClick={handleDownloadQRCode}
                            style={{
                                backgroundColor: '#222240',
                                textTransform: "capitalize",
                                borderRadius: "20px",
                                color: 'white',
                                padding: '5px 25px',
                                fontSize: "12px"
                            }}
                        >
                            <span className="icon-qr-code" style={{ marginRight: "6px", fontSize: "16px" }} />
                            {t("download")}
                        </Button>
                    </div>
                </div>

            </Box>
        </Paper>
    )
}
