import { Typography, Box, useTheme, Grid, styled, Button, TextField, IconButton, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment, ToggleButton, ToggleButtonGroup } from "@mui/material"
import EditBusinessInfoLayout from "./BusinessInfoLayout"
import { useTranslation } from "react-i18next"
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { updateBusinessData } from "../../store/register/businessSlice";
import { zodResolver } from '@hookform/resolvers/zod';
import WorkDays from "./WordDays";
import MapWithPin from "../../utils/MapWithPin";
import { useEffect, useState } from "react";

import BusinessOptions from "./BusinessOptionsComponent";
import ModeAndDesignBox from "./ModeAndDesignBox";
import useGetGovernAndCityFromQuery from "../../Hooks/Queries/public/citys/useGetGovernAndCityFromQuery";

const EditBusinessInfo = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const dispatch = useDispatch();
    const { businessData, branches, selectedBranch } = useSelector((state) => state.businessStore);


    // dispatch(updateBusinessData(updatedData));
    const [isMapOpen, setIsMapOpen] = useState(false)
    const PaymentMethodEnum = z.enum(['cash', 'card', 'digitalWaller']);
    const schema = z.object({
        businessName: z.string().min(1, "Name is required"),
        website: z.string().min(1, "Name is required"),
        businessEmail: z.string().min(1, "Name is required"),
        currency: z.string().min(1, "Name is required"),
        format: z.string().min(1, "Name is required"),



        businessPhone: z.string().min(1, "Name is required"),
        country: z.string().min(1, "Name is required"),
        city: z.string().min(1, "Name is required"),

        location: z.object({
            latitude: z.number(),
            longitude: z.number(),
        }),

        mode: z.string().min(1, "Name is required"),
        design: z.string().min(1, "Name is required"),


        callWaiter: z.boolean(),
        paymentMethods: z.array(PaymentMethodEnum).min(1, "Select at least one payment method"),
        paymentTime: z
            .string()
            .refine(val => val === 'before' || val === 'after', {
                message: "Please select when the payment should happen (before or after)",
            }),
    });


    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            location: { lat: "", lng: "" }, // default Cairo
        },
    });


    const selectedCountry = watch("country");
    const { citysValue, governValue } = useGetGovernAndCityFromQuery(selectedCountry || "")

    useEffect(() => { setValue("city", ""); }, [selectedCountry])
    console.log("Form errors:", errors);
    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <EditBusinessInfoLayout>
            <Box sx={{ padding: "20px 50px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container display="flex" justifyContent="space-between" alignItems="center" flexDirection='column' gap='1rem' textAlign="center" spacing={2}>
                        <Grid container display={"flex"} justifyContent={"space-between"} >
                            <Grid item xs={12} md={6} gap={'.25rem'}>
                                <TextField
                                    label="businessName"
                                    fullWidth
                                    {...register("businessName")}
                                    error={!!errors.businessName}
                                    helperText={errors.businessName?.message}
                                />
                                <TextField
                                    label="website"
                                    fullWidth
                                    {...register("website")}
                                    error={!!errors.website}
                                    helperText={errors.website?.message}
                                />
                                <TextField
                                    label="businessEmail"
                                    fullWidth
                                    {...register("businessEmail")}
                                    error={!!errors.businessEmail}
                                    helperText={errors.businessEmail?.message}
                                />
                                <FormControl fullWidth error={!!errors.currency}>
                                    <Controller
                                        name="currency"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <img
                                                            src="/assets/revenue.svg"
                                                            alt="icon"
                                                            style={{ width: "16px", height: "16px" }}
                                                        />
                                                    </InputAdornment>
                                                }
                                                displayEmpty
                                            >
                                                <MenuItem value="" disabled>
                                                    currency
                                                </MenuItem>
                                                <MenuItem value="USD">USD</MenuItem>
                                                <MenuItem value="EUR">EUR</MenuItem>
                                                <MenuItem value="EGP">EGP</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    <FormHelperText>{errors.currency?.message}</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth error={!!errors.format}>
                                    <Controller
                                        name="format"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <img
                                                            src="/assets/revenue.svg"
                                                            alt="icon"
                                                            style={{ width: "16px", height: "16px" }}
                                                        />
                                                    </InputAdornment>
                                                }
                                                displayEmpty
                                            >
                                                <MenuItem value="" disabled>
                                                    format
                                                </MenuItem>
                                                <MenuItem value="USD">USD</MenuItem>
                                                <MenuItem value="EUR">EUR</MenuItem>
                                                <MenuItem value="EGP">EGP</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    <FormHelperText>{errors.format?.message}</FormHelperText>
                                </FormControl>

                                <WorkDays />

                            </Grid>
                            <Grid item xs={12} md={5}>

                                <TextField
                                    fullWidth
                                    {...register("businessPhone", { required: "phone is required" })}
                                    error={!!errors.businessPhone}
                                    helperText={errors.businessPhone?.message}
                                />

                                <Box display="flex" justifyContent="left" gap={'.5rem'}>
                                    <FormControl fullWidth error={!!errors.country}>
                                        <Controller
                                            name="country"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <img
                                                                src="/assets/revenue.svg"
                                                                alt="icon"
                                                                style={{ width: "16px", height: "16px" }}
                                                            />
                                                        </InputAdornment>
                                                    }
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>
                                                        country
                                                    </MenuItem>
                                                    {governValue.map(govern => (<MenuItem key={govern?.id} value={govern?.id}>{govern?.name_en}</MenuItem>))}
                                                </Select>
                                            )}
                                        />
                                        <FormHelperText>{errors.country?.message}</FormHelperText>
                                    </FormControl>
                                    <FormControl fullWidth error={!!errors.city}>
                                        <Controller
                                            name="city"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <img
                                                                src="/assets/revenue.svg"
                                                                alt="icon"
                                                                style={{ width: "16px", height: "16px" }}
                                                            />
                                                        </InputAdornment>
                                                    }
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>
                                                        city
                                                    </MenuItem>
                                                    {citysValue.map(city => (<MenuItem key={city?.id} value={city?.id}>{city?.name_en}</MenuItem>))}
                                                </Select>
                                            )}
                                        />
                                        <FormHelperText>{errors.city?.message}</FormHelperText>
                                    </FormControl>


                                </Box>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field: { onChange, value } }) => {
                                        return (
                                            <MapWithPin
                                                isMapOpen={isMapOpen}
                                                setIsMapOpen={setIsMapOpen}
                                                setPos={(pos) => onChange({ latitude: pos.lat, longitude: pos.lng })}
                                                currentPos={{
                                                    latitude: value.latitude,
                                                    longitude: value.longitude,
                                                }}
                                            />
                                        )
                                    }}
                                />

                                {errors.location && (
                                    <p style={{ color: "red" }}>
                                        {errors.location.lat?.message || errors.location.lng?.message}
                                    </p>
                                )}

                                <ModeAndDesignBox control={control} errors={errors} />

                                <BusinessOptions control={control} errors={errors} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: '300px',
                                    fontSize: "13px",
                                    borderRadius: '50px',
                                    backgroundColor: theme.palette.orangePrimary.main,
                                    textTransform: 'none',
                                    padding: "6px 15px",
                                    '&:hover': { backgroundColor: theme.palette.orangePrimary.main },
                                    color: "#fff",
                                }}
                            >
                                {t("next")}
                                <TrendingFlatIcon sx={{ marginLeft: "8px", fontSize: "18px" }} />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box >
        </EditBusinessInfoLayout >
    )
}

export default EditBusinessInfo








