import React, { useEffect } from 'react'
import BranchForm from './save-page-branch-data-from';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, useTheme } from '@mui/material';
import PersonalInfoForm from './save-page-person-data-from';
import {
  CheckOutlined,
} from '@mui/icons-material';
import { saveNewRegisterUserFormSchema } from './saveNewRegisterUserFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { selectRegisterPersonalData } from '../../../../store/register/personalSlice';


const SaveRegisterUserDataPage = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { businessData, branches, selectedBranch } = useSelector((state) => state.registerBranchStore);
  const data = useSelector(selectRegisterPersonalData);
  console.log("selectRegisterPersonalData", data)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver(saveNewRegisterUserFormSchema),
    mode: "onBlur",
    defaultValues: {
      image: data?.image || "",
      fullName: data?.fullName || "",
      countryCode:data?.countryCode || "",
      phone: data?.phone || "",
      email: data?.email || "",
      pin: "",
      website: data?.website || "",
      country: data?.country || "",
      day: data?.day || "",
      month: data?.month || "",
      year: data?.year || "",
      password: data?.password || "",
      confirmPassword: data?.confirmPassword || "",
      branches: branches || []
    }
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  const currentValues = watch();
  console.log(currentValues)

  console.log("fromError ", errors)



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="flex flex-wrap w-full min-h-[100vh] p-2 md:p-0">
          <div className="w-full md:w-1/2  md:border-e md:pe-2">
            <PersonalInfoForm
              control={control}
              errors={errors}
              i18n={i18n}
              setValue={setValue}
              t={t}
              watch={watch}
              getValues={getValues}
              trigger={trigger}
            />
          </div>
          <div className="w-full md:w-1/2 md:pe-1 md:ps-2">
            <BranchForm
              control={control}
              errors={errors}
              i18n={i18n}
              setValue={setValue}
              t={t}
              watch={watch}
              getValues={getValues}
            />
          </div>
          <div className='mx-auto mt-auto '>
            <Button
              type="submit"
              sx={{
                width: '160px',
                textTransform: 'capitalize',
                backgroundColor: theme.palette.orangePrimary.main,
                color: 'white',
                borderRadius: '20px',
                padding: '5px',
                '&:hover': { backgroundColor: '#ef7d10' },
              }}
            >
              <CheckOutlined sx={{ fontSize: '22px', mr: 1 }} /> {t("save")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SaveRegisterUserDataPage