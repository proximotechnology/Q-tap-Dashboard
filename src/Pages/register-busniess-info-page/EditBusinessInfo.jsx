import { Typography, Box, useTheme, Grid, styled, Button, TextField, IconButton, MenuItem, FormControl, InputLabel, Select, FormHelperText, InputAdornment, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material"
import EditBusinessInfoLayout from "./BusinessInfoLayout"
import { useTranslation } from "react-i18next"
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { updateBusinessData, updateBusinessDataByIndex } from "../../store/register/businessSlice";
import { zodResolver } from '@hookform/resolvers/zod';
import WorkDays from "./WordDays";
import MapWithPin from "../../utils/MapWithPin";
import { useEffect, useRef, useState } from "react";

import BusinessOptions from "./BusinessOptionsComponent";
import ModeAndDesignBox from "./ModeAndDesignBox";
import useGetGovernAndCityFromQuery from "../../Hooks/Queries/public/citys/useGetGovernAndCityFromQuery";
import { useNavigate, useParams } from "react-router";

const EditBusinessInfo = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const dispatch = useDispatch();
    const { branches } = useSelector((state) => state.businessStore);

    const { id } = useParams();

    const [isMapOpen, setIsMapOpen] = useState(false)


    const timeRangeSchema = z
        .array(z.string().min(1))
        .length(2, { message: "You must select both start and end time" }) // ✅ custom message
        .refine(([start, end]) => start !== end, {
            message: "Start and end time cannot be the same",
        });

    const workScheduleSchema = z
        .record(z.string(), timeRangeSchema)
        .refine(obj => Object.keys(obj).length > 0, {
            message: "You must select at least one working day",
        });
    const PaymentMethodEnum = z.enum(['cash', 'card', 'digitalWaller']);
    const schema = z.object({
        businessName: z.string().min(1, "Name is required"),
        website: z.string().optional(),
        businessEmail: z.string().min(1, "Name is required"),
        currency: z.string().min(1, "Name is required"),
        format: z.string().min(1, "Name is required"),

        workschedules: workScheduleSchema,

        businessPhone: z.string().min(1, "Name is required"),
        country: z.number({ required_error: "country is required" }).min(1),
        city: z.union([
            z.number().min(1, "Field is required"),
            z.literal(""),
        ]).refine((val) => typeof val === "number" && val > 0, {
            message: "This field is required",
        }),


        latitude: z.number().optional().refine(
            (latitude) => typeof latitude === "number",
            {
                message: "You must select location",
                path: ["latitude"],
            }
        ),
        longitude: z.number().optional().refine(
            (longitude) => typeof longitude === "number",
            {
                message: "You must select location",
                path: ["longitude"],
            }
        ),

        mode: z.string().min(1, "Name is required"),
        design: z.string().min(1, "Name is required"),


        callWaiter: z.enum(["active", "inactive"], {
            required_error: "Please select call waiter status",
        })
        ,
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
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            ...(branches?.[id]),
            latitude: branches?.[id]?.latitude ?? "",
            longitude: branches?.[id]?.longitude ?? "",
            workSchedules: {}
        },
    });


    const selectedCountry = watch("country");
    const latitude = watch("latitude");
    const longitude = watch("longitude");

    const { citysValue, governValue } = useGetGovernAndCityFromQuery(selectedCountry || "")


    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        dispatch(updateBusinessDataByIndex({
            index: id,
            ...data
        }))
        navigate("/branches", { replace: true });
    };

    return (
        <EditBusinessInfoLayout>
            <Box sx={{ padding: "20px 50px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container display="flex" justifyContent="space-between" alignItems="center" flexDirection='column' gap='1rem' textAlign="center" spacing={2}>
                        <Grid container display={"flex"} justifyContent={"space-between"} >
                            <Grid item xs={12} md={6} gap={'.25rem'}>
                                <Stack spacing={2}>
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
                                                        business format
                                                    </MenuItem>
                                                    <MenuItem value="USD">USD</MenuItem>
                                                    <MenuItem value="EUR">EUR</MenuItem>
                                                    <MenuItem value="EGP">EGP</MenuItem>
                                                </Select>
                                            )}
                                        />
                                        <FormHelperText>{errors.format?.message}</FormHelperText>
                                    </FormControl>

                                    <WorkDays
                                        setValue={setValue}
                                        watch={watch}
                                        getValues={getValues}
                                        control={control}
                                        errors={errors}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Stack spacing={2}>

                                    <TextField
                                        fullWidth
                                        placeholder="business Phone"
                                        {...register("businessPhone", { required: "phone is required" })}
                                        error={!!errors.businessPhone}
                                        helperText={errors.businessPhone?.message}
                                    />

                                    <Box display="flex" justifyContent="left" gap={'.5rem'}>
                                        <FormControl fullWidth error={!!errors.country}>
                                            <Controller
                                                name="country"
                                                control={control}
                                                defaultValue={undefined}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        onChange={
                                                            (e) => {
                                                                const selected = e.target.value;
                                                                setValue("country", selected)
                                                                setValue("city", "")
                                                            }
                                                        }
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
                                                        {governValue.map(govern => (<MenuItem key={govern?.id} value={govern.id}>{govern?.name_en}</MenuItem>))}
                                                    </Select>
                                                )}
                                            />
                                            <FormHelperText>{errors.country?.message}</FormHelperText>
                                        </FormControl>
                                        <FormControl fullWidth error={!!errors.city}>
                                            <Controller
                                                name="city"
                                                control={control}
                                                defaultValue={undefined}
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
                                                        {citysValue.map(city => (<MenuItem key={city?.id} value={city.id}>{city?.name_en}</MenuItem>))}
                                                    </Select>
                                                )}
                                            />
                                            <FormHelperText>{errors.city?.message}</FormHelperText>
                                        </FormControl>


                                    </Box>
                                    <MapWithPin
                                        isMapOpen={isMapOpen}
                                        setIsMapOpen={setIsMapOpen}
                                        setPos={(pos) => {
                                            setValue("latitude", pos.lat, { shouldDirty: true, shouldValidate: true });
                                            setValue("longitude", pos.lng, { shouldDirty: true, shouldValidate: true });
                                        }}
                                        currentPos={{
                                            latitude,
                                            longitude,
                                        }}
                                    />
                                    {
                                        (errors.latitude || errors.longitude) && (
                                            <p style={{ color: "#f44336" }}>
                                                {errors.latitude.message || errors.longitude?.message}
                                            </p>
                                        )
                                    }

                                    <ModeAndDesignBox control={control} errors={errors} />

                                    <BusinessOptions control={control} errors={errors} />
                                </Stack>
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
                                {t("Done")}
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
