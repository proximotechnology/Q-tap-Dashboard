import React from 'react';
import { Box, Typography, Divider, DialogContent, Dialog, TextField, Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StraightIcon from '@mui/icons-material/Straight';
const CategoryForm = ({ open, handleClose }) => {
  return (
    <Dialog open={open} disableScrollLock>
      <DialogContent sx={{ width: "400px", backgroundColor: 'white', borderRadius: "20px" }}>


        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontSize={"13px"} color={"#575756"}>Add Category</Typography>
          <IconButton onClick={handleClose}>
            <span class="icon-close-1" style={{ fontSize: "11px" }}></span>
          </IconButton>
      </Box>
      <Divider sx={{background: 'linear-gradient(to left, #ff7e5f, #feb47b)',marginBottom:"10px", height: 1 }} />


      <Box display="flex" flexDirection="column" gap={2} sx={{ marginBottom: 2 }}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Box flex={1}>
            <Typography variant="body2" align="left" sx={{ marginBottom: '4px', color:"#575756",fontSize: "10px" }}>Name</Typography>
            <TextField
              fullWidth
              sx={{ height: '40px', '& .MuiInputBase-root': { height: '35px' } }}
            />
          </Box>
          <Box flex={1}>
            <Typography variant="body2" align="left" sx={{ marginBottom: '4px', color:"#575756",fontSize: "10px" }}>Description</Typography>
            <TextField
              fullWidth
              sx={{ height: '40px', '& .MuiInputBase-root': { height: '35px' } }}
            />
          </Box>
        </Box>
      </Box>


      <Box sx={{ marginY: 3, display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
        <Box sx={{ marginBottom: 2 }}>
          <Box sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#f5f5f5',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
              <span class="icon-image-gallery" style={{fontSize:"30px",color:"gray"}}></span>
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '25%',
              backgroundColor: '#222240',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              fontSize: '8px',
            }}>
              <StraightIcon sx={{ color: "#ef7d00", fontSize: '10px', marginRight: '4px' }} />
              Upload
            </Box>
          </Box>

          <Typography variant="body2" sx={{ fontSize: "8px", color: "#9d9d9c", marginTop: '4px', textAlign: 'center' }}>
            (Grid Menu) Category Icon 200x200px
          </Typography>

        </Box>   {/* upload1 */}

        <Box sx={{ marginBottom: 1 }}>
          <Box sx={{
            width: '250px',
            height: '100px',
            borderRadius: "20px",
            backgroundColor: '#f5f5f5',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <span class="icon-image-gallery" style={{fontSize:"35px",color:"gray"}}></span>
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '20%',
              backgroundColor: '#222240',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              fontSize: '8px',
            }}>
              <StraightIcon sx={{ color: "#ef7d00", fontSize: '10px', marginRight: '4px' }} />
              Upload
            </Box>
          </Box>

          <Typography variant="body2" sx={{ fontSize: "8px", color: "#9d9d9c", marginTop: '4px', textAlign: 'center' }}>
            (Grid Menu) Category Icon 200x200px
          </Typography>
        </Box> {/* upload2 */}

        {/* Save Button */}
        <Button
          variant="contained" color="warning" fullWidth
          sx={{ width: "40%", fontSize:"11px",borderRadius: "20px", marginTop: 2, textTransform: "capitalize" }}>
          <CheckIcon sx={{ fontSize: "16px", marginRight: "5px" }} />
          Save
        </Button>
      </Box>

    </DialogContent>
    </Dialog >



  );
};

export default CategoryForm;
