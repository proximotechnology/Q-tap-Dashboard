
import { Box, Button, styled, Typography, IconButton, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import { useBusinessContext } from '../../context/BusinessContext';

const Divider = styled(Box)({
  width: '5%',
  height: '3px',
  backgroundColor: '#E57C00',
  borderRadius: '20px',
  marginBottom: '20px',
});

export const Branches = () => {
  const { branches, setBranches } = useBusinessContext(); // Access branches from context
  const navigate = useNavigate();

  const deleteBranch = (index) => {
    setBranches((prevBranches) => prevBranches.filter((_, i) => i !== index));
  };
  
  const handleDoneClick = () => {
    // console.log('Branches:::::', branches);
    navigate('/payment'); 
  };

  return (
    <Box marginTop={'50px'} flexGrow={1}>
      <Typography variant="body1" sx={{ fontSize: '18px', color: '#222240' }}>
        Branches
      </Typography>
      <Divider />

      <Box sx={{ display: 'flex', marginTop: { xs: '20px', md: '50px' }, marginLeft: '30px', flexWrap: 'wrap' }}>
        {/* Display existing branches */}
        {branches.map((branch, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', sm: '45%', md: '140px' },
              marginRight: { sm: '20px' },
              height: '140px',
              borderRadius: '20px',
              backgroundColor: '#222240',
              marginBottom: '20px',
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '12px', color: '#E57C00', padding: '25px 0px 0px 16px' }}>
              Branch {index + 1}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '12px', color: '#E57C00', padding: '10px 0px 0px 16px' }}>
              {branch.businessName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '12px', color: '#E57C00', padding: '10px 0px 0px 16px' }}>
              {branch.city}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
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
          }}
        >
          <ControlPointOutlinedIcon sx={{ color: '#E57C00', fontSize: '45px' }} />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '30px',
          left: '55%',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: { xs: '90%', md: '65%', lg: '65%' },
            color: 'gray',
            fontSize: '13px',
            marginBottom: '20px',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <PriorityHighOutlinedIcon sx={{ verticalAlign: 'middle', marginRight: '2px' }} />
          Please note that when adding a new branch,
          <span style={{ color: '#E57C00' }}>50%</span> of the package value will be added.
        </Typography>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              width: '60%',
              fontSize: '13px',
              borderRadius: '50px',
              backgroundColor: '#E57C00',
              textTransform: 'none',
              padding: '6px 0',
              '&:hover': {
                backgroundColor: '#E57C00',
              },
              color: '#fff',
            }}
            onClick={handleDoneClick} // Call handleDoneClick
          >
            Done
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};