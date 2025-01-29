import { Box, Grid, Paper, TextField, Typography, IconButton } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

const Content = forwardRef((props, ref) => {
	const [homeContent, setHomeContent] = useState([{ titleEn: '', descriptionEn: '', titleAr: '', descriptionAr: '' }]);
	const [productContent, setProductContent] = useState([{ titleEn: '', descriptionEn: '', titleAr: '', descriptionAr: '' }]);

	const addHomeSection = () => {
		setHomeContent([...homeContent, { titleEn: '', descriptionEn: '', titleAr: '', descriptionAr: '' }]);
	};

	const addProductSection = () => {
		setProductContent([...productContent, { titleEn: '', descriptionEn: '', titleAr: '', descriptionAr: '' }]);
	};

	const handleHomeInputChange = (index, field, value) => {
		const newContent = [...homeContent];
		newContent[index][field] = value;
		setHomeContent(newContent);
	};

	const handleProductInputChange = (index, field, value) => {
		const newContent = [...productContent];
		newContent[index][field] = value;
		setProductContent(newContent);
	}

	const handleSave = () => {
		// Filter out empty content and validate
		const validHomeContent = homeContent.filter(content => {
			const hasEnglishContent = content.titleEn.trim() !== '' && content.descriptionEn.trim() !== '';
			const hasArabicContent = content.titleAr.trim() !== '' && content.descriptionAr.trim() !== '';
			
			return hasEnglishContent || hasArabicContent;
		});

		if (validHomeContent.length === 0) {
			toast.error("Please add at least one complete section in either English or Arabic!");
			return;
		}

		// Validate each section individually
		for (const content of validHomeContent) {
			const hasEnglishTitle = content.titleEn.trim() !== '';
			const hasEnglishDesc = content.descriptionEn.trim() !== '';
			const hasArabicTitle = content.titleAr.trim() !== '';
			const hasArabicDesc = content.descriptionAr.trim() !== '';

			if ((hasEnglishTitle && !hasEnglishDesc) || (!hasEnglishTitle && hasEnglishDesc)) {
				toast.error("Please complete both title and description in English!");
				return;
			}

			if ((hasArabicTitle && !hasArabicDesc) || (!hasArabicTitle && hasArabicDesc)) {
				toast.error("Please complete both title and description in Arabic!");
				return;
			}
		}

		// Format data for API - only include non-empty content
		const titles = [];
		const descriptions = [];

		validHomeContent.forEach(content => {
			if (content.titleEn.trim() && content.descriptionEn.trim()) {
				titles.push(content.titleEn.trim());
				descriptions.push(content.descriptionEn.trim());
			}
			if (content.titleAr.trim() && content.descriptionAr.trim()) {
				titles.push(content.titleAr.trim());
				descriptions.push(content.descriptionAr.trim());
			}
		});

		const formattedData = {
			titles: titles,
			descriptions: descriptions,
			features: [""]  // or remove this if not needed
		};

		// Send to API
		fetch("https://highleveltecknology.com/Qtap/api/settings/content", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
			},
			body: JSON.stringify(formattedData),
		})
			.then(response => response.json())
			.then((data) => {
				if (data.error) {
					throw new Error(data.error);
				}
				toast.success("Content saved successfully!");
			})
			.catch((error) => {
				console.error("Error saving content:", error);
				toast.error("Failed to save content!");
			});
	};

	useImperativeHandle(ref, () => ({
		saveContent: handleSave,
	}));

	return (
		<Box>
			<Typography variant="body1" sx={{ fontSize: "13px", marginLeft: "30px", color: "#575756", marginBottom: '10px' }}>
				Home
			</Typography>

			{homeContent.map((content, index) => (
				<Paper key={index} sx={{ padding: "20px 50px", borderRadius: "20px", marginBottom: "20px" }}>
					<Grid item xs={12} md={9}>
						<Grid container spacing={1}>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Title (En)"
									fullWidth
									variant="outlined"
									size="small"
									value={content.titleEn}
									onChange={(e) => handleHomeInputChange(index, 'titleEn', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "25px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Description (En)"
									fullWidth
									variant="outlined"
									size="small"
									value={content.descriptionEn}
									onChange={(e) => handleHomeInputChange(index, 'descriptionEn', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "40px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Title (Ar)"
									fullWidth
									variant="outlined"
									size="small"
									value={content.titleAr}
									onChange={(e) => handleHomeInputChange(index, 'titleAr', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "25px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Description (Ar)"
									fullWidth
									variant="outlined"
									size="small"
									value={content.descriptionAr}
									onChange={(e) => handleHomeInputChange(index, 'descriptionAr', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "40px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			))}

			<Box display="flex" justifyContent="center" alignItems="center" mb={3}>
				<IconButton onClick={addHomeSection} sx={{ textAlign: "center" }}>
					<AddIcon fontSize="large" sx={{ color: "grey" }} />
				</IconButton>
			</Box>

			<Typography variant="body1" sx={{ fontSize: "13px", marginLeft: "30px", color: "#575756", marginBottom: '10px' }}>
				Products
			</Typography>

			{productContent.map((content, index) => (
				<Paper key={index} sx={{ padding: "20px 50px", borderRadius: "20px", marginBottom: "20px" }}>
					<Grid item xs={12} md={9}>
						<Grid container spacing={1}>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Title (En)"
									fullWidth
									variant="outlined"
									size="small"
									// value={content.title}
									// onChange={(e) => handleProductInputChange(index, 'title', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "25px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Description (En)"
									fullWidth
									variant="outlined"
									size="small"
									// value={content.description}
									// onChange={(e) => handleProductInputChange(index, 'description', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "40px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Title (Ar)"
									fullWidth
									variant="outlined"
									size="small"
									// value={content.title}
									// onChange={(e) => handleProductInputChange(index, 'title', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "25px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									placeholder="Description (Ar)"
									fullWidth
									variant="outlined"
									size="small"
									// value={content.description}
									// onChange={(e) => handleProductInputChange(index, 'description', e.target.value)}
									sx={{
										'& .MuiOutlinedInput-root': {
											fontSize: "10px",
											height: "40px",
											borderRadius: "10px",
											backgroundColor: "#EBEDF3",
										},
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										}
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			))}

			<Box display="flex" justifyContent="center" alignItems="center">
				<IconButton onClick={addProductSection} sx={{ textAlign: "center" }}>
					<AddIcon fontSize="large" sx={{ color: "grey" }} />
				</IconButton>
			</Box>
		</Box>
	);
});

export default Content;

