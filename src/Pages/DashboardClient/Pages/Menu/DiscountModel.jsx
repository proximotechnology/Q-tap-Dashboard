import { Divider, IconButton, InputAdornment, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export const DiscountModel = ({ open, handleClose }) => {
  const [discounts, setDiscounts] = useState([
    { code: '123456', discount: '10%', date: '8/10/2024', status: 'Active' },
    { code: '123457', discount: '10%', date: '8/10/2024', status: 'Inactive' }
  ]);
  
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  const handleAdd = () => {
    if (code && discount) {
      const today = new Date().toLocaleDateString();  
      const newDiscount = {
        code,
        discount: `${discount}%`,
        date: today,
        status: 'Active'
      };
      setDiscounts([...discounts, newDiscount]);  
      setCode(''); 
      setDiscount('');
    }
  };


  const handleDelete = (index) => {
    const updatedDiscounts = discounts.filter((_, i) => i !== index);
    setDiscounts(updatedDiscounts);
  };

  return (
    <Modal open={open} onClose={handleClose} disableScrollLock>
      <Box sx={{
        width: 400,
        height: "400px",
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        mx: 'auto',
        mt: '20vh',
        position: 'relative'
      }}>
        <Box sx={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>
              Discount Codes
            </Typography>
            <IconButton onClick={handleClose}>
              
              <span class="icon-close-1" style={{ fontSize: "12px" }}></span>
            </IconButton>


          </Box>
          <Divider sx={{ backgroundColor: '#F58125', height: '1px' }} />

          <Box sx={{ marginTop: "10px" }}>
            <Grid container spacing={2} sx={{ mb: 2, marginTop: "12px" }}>
              <Grid item xs={6}>
                <Typography variant='body2' sx={{ fontSize: "10px", color: "#575756" }}>Code</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Please enter only digits"
                  InputProps={{
                    sx: { height: 33, lineHeight: "33px", borderRadius: "6px", fontSize: "10px" }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body2' sx={{ fontSize: "10px", color: "#575756" }}>Discount</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Please enter only digits"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    sx: { height: 33, lineHeight: "33px", borderRadius: "6px", fontSize: "10px" }
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                onClick={handleAdd}
                variant="contained"
                sx={{
                  backgroundColor: '#E57C00',
                  borderRadius: '25px',
                  color: 'white',
                  width: "30%",
                  textTransform: 'none',
                  fontSize:"12px" , 
                  padding: '2px 10px',
                  '&:hover': {
                    backgroundColor: '#E57C00',
                  },
                }}
              >
                + Add
              </Button>
            </Box>
          </Box>
        </Box>

        <Table sx={{ p: 0, mt: 2, mb: 5, width: '100%', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#EBEDF3" }}>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Code</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Discount</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Date</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts.map((discount, index) => (
              <TableRow key={index} sx={{ height: '36px' }}>
                <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>{discount.code}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>{discount.discount}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>{discount.date}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>
                  <Box
                    sx={{
                      color: "white",
                      backgroundColor: discount.status === 'Active' ? "#479947" : "#f05e5e",
                      width: "55px", padding: "2px 0px",
                      borderRadius: '12px',
                      display: 'inline-block',
                    }}
                  >
                    {discount.status}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "10px", textAlign: "center", padding: '3px 0px', borderBottom: "none" }}>
                <IconButton size="small"  >
                    <span class="icon-edit" sx={{fontSize:"10px", color:"black"}}></span>
                  </IconButton>
                  
                  <IconButton size="small" onClick={() => handleDelete(index)} color="error">
                    <span class="icon-delete" sx={{ fontSize: "10px" }}></span>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};





// import { Divider, IconButton, InputAdornment, Modal, Typography } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import { Box, Grid, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const DiscountModel = ({ open, handleClose }) => {
//   const [discounts, setDiscounts] = useState([
//     { code: '123456', discount: '10%', date: '8/10/2024', status: 'Active' },
//     { code: '123457', discount: '10%', date: '8/10/2024', status: 'Inactive' }
//   ]);
  
//   const [code, setCode] = useState('');
//   const [discount, setDiscount] = useState('');

//   const handleAdd = async () => {
//     try {
//         if (!code || !discount) {
//             toast.error('Please fill in all fields');
//             return;
//         }

//         const formData = {
//             code: code,
//             discount: discount
//         };

//         const response = await axios({
//             method: 'POST',
//             url: 'https://highleveltecknology.com/Qtap/api/discount',
//             data: formData,
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.data) {
//             toast.success('Discount added successfully!');
//             // Update local state
//             const today = new Date().toLocaleDateString();
//             const newDiscount = {
//                 code,
//                 discount: `${discount}%`,
//                 date: today,
//                 status: 'Active'
//             };
//             setDiscounts([...discounts, newDiscount]);
//             // Reset form
//             setCode('');
//             setDiscount('');
//         }
//     } catch (error) {
//         console.error('Error adding discount:', error);
//         const errorMessage = error.response?.data?.message || 'Error adding discount';
//         toast.error(errorMessage);
//     }
//   };

//   const handleDelete = async (index, discountId) => {
//     try {
//         const response = await axios({
//             method: 'DELETE',
//             url: `https://highleveltecknology.com/Qtap/api/discount/${discountId}`,
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//             }
//         });

//         if (response.data) {
//             toast.success('Discount deleted successfully!');
//             const updatedDiscounts = discounts.filter((_, i) => i !== index);
//             setDiscounts(updatedDiscounts);
//         }
//     } catch (error) {
//         console.error('Error deleting discount:', error);
//         toast.error('Error deleting discount');
//     }
//   };

//   const getDiscounts = async () => {
//     try {
//         const response = await axios.get('https://highleveltecknology.com/Qtap/api/discount', {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//             }
//         });
        
//         if (response.data) {
//             setDiscounts(response.data.data || []);
//         }
//     } catch (error) {
//         console.error('Error fetching discounts:', error);
//         toast.error('Error fetching discounts');
//     }
//   };

//   useEffect(() => {
//     getDiscounts();
//   }, []);

//   return (
//     <Modal open={open} onClose={handleClose} disableScrollLock>
//       <Box sx={{
//         width: 400,
//         height: "400px",
//         bgcolor: 'background.paper',
//         borderRadius: 3,
//         boxShadow: 24,
//         mx: 'auto',
//         mt: '20vh',
//         position: 'relative'
//       }}>
//         <Box sx={{ padding: "20px" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="body1" sx={{ fontSize: "12px", color: "#575756" }}>
//               Discount Codes
//             </Typography>
//             <IconButton onClick={handleClose}>
              
//               <span class="icon-close-1" style={{ fontSize: "12px" }}></span>
//             </IconButton>


//           </Box>
//           <Divider sx={{ backgroundColor: '#F58125', height: '1px' }} />

//           <Box sx={{ marginTop: "10px" }}>
//             <Grid container spacing={2} sx={{ mb: 2, marginTop: "12px" }}>
//               <Grid item xs={6}>
//                 <Typography variant='body2' sx={{ fontSize: "10px", color: "#575756" }}>Code</Typography>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   placeholder="Please enter only digits"
//                   InputProps={{
//                     sx: { height: 33, lineHeight: "33px", borderRadius: "6px", fontSize: "10px" }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant='body2' sx={{ fontSize: "10px", color: "#575756" }}>Discount</Typography>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   value={discount}
//                   onChange={(e) => setDiscount(e.target.value)}
//                   placeholder="Please enter only digits"
//                   InputProps={{
//                     endAdornment: <InputAdornment position="end">%</InputAdornment>,
//                     sx: { height: 33, lineHeight: "33px", borderRadius: "6px", fontSize: "10px" }
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//               <Button
//                 onClick={handleAdd}
//                 variant="contained"
//                 sx={{
//                   backgroundColor: '#E57C00',
//                   borderRadius: '25px',
//                   color: 'white',
//                   width: "30%",
//                   textTransform: 'none',
//                   fontSize:"12px" , 
//                   padding: '2px 10px',
//                   '&:hover': {
//                     backgroundColor: '#E57C00',
//                   },
//                 }}
//               >
//                 + Add
//               </Button>
//             </Box>
//           </Box>
//         </Box>

//         <Table sx={{ p: 0, mt: 2, mb: 5, width: '100%', tableLayout: 'fixed' }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#EBEDF3" }}>
//               <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Code</TableCell>
//               <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Discount</TableCell>
//               <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Date</TableCell>
//               <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Status</TableCell>
//               <TableCell sx={{ fontSize: "10px", padding: '0px', borderBottom: "none", textAlign: "center", color: "#575756" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {discounts.map((discount, index) => (
//               <TableRow key={index} sx={{ height: '36px' }}>
//                 <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>{discount.code}</TableCell>
//                 <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>{discount.discount}</TableCell>
//                 <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>{discount.date}</TableCell>
//                 <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 0px', borderBottom: "none" }}>
//                   <Box
//                     sx={{
//                       color: "white",
//                       backgroundColor: discount.status === 'Active' ? "#479947" : "#f05e5e",
//                       width: "55px", padding: "2px 0px",
//                       borderRadius: '12px',
//                       display: 'inline-block',
//                     }}
//                   >
//                     {discount.status}
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ fontSize: "10px", textAlign: "center", padding: '3px 0px', borderBottom: "none" }}>
//                 <IconButton size="small"  >
//                     <span class="icon-edit" sx={{fontSize:"10px", color:"black"}}></span>
//                   </IconButton>
                  
//                   <IconButton size="small" onClick={() => handleDelete(index, discount.id)} color="error">
//                     <span class="icon-delete" sx={{ fontSize: "10px" }}></span>
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </Modal>
//   );
// };
