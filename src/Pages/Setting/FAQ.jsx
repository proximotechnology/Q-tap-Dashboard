import {
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { data } from './../DashboardClient/Pages/DashHome/Row2/BarChart';
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../utils/helperFunction";

const initialData = [{ faq: "FAQ 1" }];

export const FAQ = forwardRef((props, ref) => {
  const [data, setData] = useState(initialData);
  const [faqs, setFaqs] = useState([{ question: '', answer: '', questionAr: '', answerAr: '' }]);
  const {t} = useTranslation()
  const theme = useTheme();
  // دالة لإضافة كائن جديد عند الضغط على زر +
  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '', questionAr: '', answerAr: '' }]);
    const newFaq = { faq: `FAQ ${data.length + 1}` };
    setData([...data, newFaq]);
  };

  const handleInputChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const handleSave = () => {
    // Filter out empty FAQs
    const validFaqs = faqs.filter(faq => 
      faq.question.trim() !== '' && faq.answer.trim() !== ''
    );

    if (validFaqs.length === 0) {
      toast.error(t("plAtleastOneFAQ"));
      return;
    }

    // Format data as expected by the API
    const formattedData = {
      question: validFaqs.map(faq => faq.question),
      answer: validFaqs.map(faq => faq.answer),
      // questionAr: validFaqs.map(faq => faq.questionAr),
      // answerAr: validFaqs.map(faq => faq.answerAr),
    };

    // Send to API

    fetch(`${BASE_URL}settings/faq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(formattedData),
    })
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(t("FAQAddSucc"));
    })
    .catch((error) => {
      console.error("Error saving faqs:", error);
      toast.error(t("FAQAddErr"));
    });
  };

  useImperativeHandle(ref, () => ({
    saveFaq: handleSave,
  }));

  return (
    <Paper sx={{ padding: "20px 50px", borderRadius: "20px" }}>
      {data.map((item, index) => (
        <Box key={index}>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "10px", color: theme.palette.text.gray, marginBottom: "5px" }}
          >
            {item.faq}
          </Typography>
          <Grid item xs={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <TextField
                  placeholder={t("questions")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={faqs[index]?.question || ''}
                  onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "10px",
                      height: "25px",
                      borderRadius: "10px",
                      backgroundColor: theme.palette.bodyColor.secandaryInput,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  placeholder={t("answer")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={faqs[index]?.answer || ''}
                  onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "10px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: theme.palette.bodyColor.secandaryInput,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  placeholder={t("questionsAr")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  // value={questionAr}
                  // onChange={(e) => setQuestionAr(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "10px",
                      height: "25px",
                      borderRadius: "10px",
                      backgroundColor: theme.palette.bodyColor.secandaryInput,
                      border: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  placeholder={t("answerAr")}
                  fullWidth
                  variant="outlined"
                  size="small"
                  // value={answerAr}
                  // onChange={(e) => setAnswerAr(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "10px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: theme.palette.bodyColor.secandaryInput,
                      border: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ margin: "15px" }} />
        </Box>
      ))}
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={addFaq} sx={{ textAlign: "center" }}>
          <AddIcon fontSize="large" sx={{ color: "grey" }} />
        </IconButton>
      </Box>
    </Paper>
  );
});
