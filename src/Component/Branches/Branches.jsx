
import { Box, Button, styled, Typography, IconButton, Grid, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import { useBusinessContext } from '../../context/BusinessContext';
import { useTranslation } from 'react-i18next';
import  styles  from '../../Pages/DashboardClient/Pages/SupportClient/supportCard.module.css';



export const Branches = () => {
  const theme = useTheme();
  const Divider = styled(Box)({
    width: '5%',
    height: '3px',
    backgroundColor: theme.palette.orangePrimary.main,
    borderRadius: '20px',
    marginBottom: '20px',
  });
  
  const { branches, setBranches } = useBusinessContext(); // Access branches from context
  const navigate = useNavigate();

  const deleteBranch = (index) => {
    setBranches((prevBranches) => prevBranches.filter((_, i) => i !== index));
  };

  const { t } = useTranslation()

  const handleDoneClick = () => {
    // console.log('Branches:::::', branches);
    navigate('/payment');
  };

  return (
    <Box marginTop={'50px'} padding={"10px 40px"} flexGrow={1}>
      <Typography variant="body1" sx={{ fontSize: '18px', color: theme.palette.secondaryColor.main }}>
        {t("branches")}
      </Typography>
      <Divider />

      <Box sx={{ display: 'flex', marginTop: { xs: '20px', md: '50px' }, marginInlineStart: '30px', flexWrap: 'wrap' }}>
        {/* Display existing branches */}
        {branches.map((branch, index) => (
          <Box
            className={styles.card}
            key={index}
            sx={{
              width: { xs: '100%', sm: '45%', md: '140px' },
              marginRight: { sm: '20px' },
              height: '140px',
              borderRadius: '20px',
              backgroundColor: theme.palette.secondaryColor.main,
              marginBottom: '20px',
              padding: "10px 10px 15px 10px ",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '15px', color: theme.palette.orangePrimary.main, padding: '9px 0px 0px 16px' }}>
              Branch {index + 1}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '8px', color: '#ffffff', padding: '7px 0px 0px 16px' }}>
              {"Name"}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '15px', color: theme.palette.orangePrimary.main, padding: '0 0px 0px 16px' }}>
              {branch.businessName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '8px', color: '#ffffff', padding: '7px 0px 0px 16px' }}>
              {"City"}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '15px', color: theme.palette.orangePrimary.main, padding: '0 0px 0px 16px' }}>
              {branch.city}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={() => deleteBranch(index)}>
                <span className="icon-delete" style={{ fontSize: '16px', color: 'white' }}></span>
              </IconButton>
              <IconButton>
                <img src="/assets/setting.svg" alt="icon" style={{ width: '18px', height: '18px' }} />
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* Add new branch button */}
        <Box
          onClick={() => navigate('/business-info')}
          sx={{
            width: { xs: '100%', sm: '45%', md: '140px' },
            height: '140px',
            borderRadius: '20px',
            border: '1px solid gray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            padding: "10px 10px 15px 10px ",

          }}
        >
          <ControlPointOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: '45px' }} />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection:'column',
          alignItems:'center',
          position:"fixed",
          bottom: '30px',
          left: '47%',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: { xs: '90%', md: '80%', lg: '80%' },
            color: 'gray',
            fontSize: '13px',
            marginBottom: '20px',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <PriorityHighOutlinedIcon sx={{ verticalAlign: 'middle', marginRight: '2px' }} />
          {t("plNoteBranch")}
          <span style={{ color: theme.palette.orangePrimary.main }}>50%</span> {t("plNoteBranch2")}
        </Typography>
       
          <Button
            variant="contained"
            sx={{
              width: '300px',
              fontSize: '13px',
              borderRadius: '50px',
              backgroundColor: theme.palette.orangePrimary.main,
              textTransform: 'none',
              padding: '6px 0',
              '&:hover': {
                backgroundColor: theme.palette.orangePrimary.main,
              },
              color: '#fff',
            }}
            onClick={handleDoneClick} // Call handleDoneClick
          >
            {t("done")}
          </Button>
        
      </Box>
    </Box>
  );
};