import { FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react'
import { COUNTRIES_CODES } from '../../utils/constant-variables/countries-codes';
import { useTranslation } from 'react-i18next';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const PhoneField = ({ phone, setPhone, setCountryCode, countryCode }) => {
    const { t } = useTranslation()
    const handleChange = (e) => {
        // Always store as string, not number
        let value = e.target.value;

        // Remove non-numeric characters
        value = value.replace(/[^0-9]/g, "");

        // Remove leading zero if exists
        value = value.replace(/^0+/, "");

        setPhone(value);
    };
    return (
        <>
            <FormControl variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-phone"
                    startAdornment={
                        <InputAdornment position="start" sx={{ display: "flex", justifyContent: "space-between" }} >

                            {/* Country code select */}
                            <Select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                sx={{
                                    "& .MuiSelect-select": { padding: "4px 8px", fontSize: "12px" },
                                    minWidth: "65px",
                                    borderRadius: "50px",
                                }}
                                variant="outlined"
                            >
                                {COUNTRIES_CODES.map((c) => (
                                    <MenuItem key={c.code} value={c.code}>
                                        {c.label} | {c.code}
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Phone icon */}
                            <PhoneOutlinedIcon sx={{ fontSize: "16px", marginInlineStart: ".7rem" }} />
                        </InputAdornment>
                    }
                    placeholder={t("mobileNumber")}
                    required
                    value={phone}
                    onChange={handleChange}
                    sx={{
                        borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px", padding: "0px"
                    }}
                />
            </FormControl>
        </>
    )
}

export default PhoneField