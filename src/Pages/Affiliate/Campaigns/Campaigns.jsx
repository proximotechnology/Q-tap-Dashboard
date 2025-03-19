
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Campaigns = () => {
  const [openForm, setOpenForm] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState("");
  const [commission, setCommission] = useState("");
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const {t} = useTranslation()

  const toggleForm = () => {
    setOpenForm(!openForm);
    if (editingCampaign) {
      setEditingCampaign(null);
      setName("");
      setCommission("");
      setLimit("");
    }
  };

  const getCampaigns = async () => {
    try {
      const response = await axios.get(
        `https://highleveltecknology.com/Qtap/api/campaigns`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await axios.delete(
        `https://highleveltecknology.com/Qtap/api/campaigns/${campaignId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      toast.success(t("campaignDeleted"));
      getCampaigns();
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error(t("errorDeleteCampaign"));
    }
  };

  const handleAddCampaign = async () => {
    try {
      setLoading(true);
      if (!name || !commission || !limit) {
        toast.error(t("plFillAllField"));
        return;
      }

      const dataCampaign = {
        name: name.trim(),
        commission: parseFloat(commission),
        limit: parseInt(limit),
      };

      const response = await axios.post(
        "https://highleveltecknology.com/Qtap/api/campaigns",
        dataCampaign,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success(t("campaignAddedSucc"));
        getCampaigns();
        setName("");
        setCommission("");
        setLimit("");
        setOpenForm(false);
      }
    } catch (error) {
      console.error("Error adding campaign:", error);
      const errorMessage =
        error.response?.data?.message || t("errorAddingCampign");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCampaign = async (campaignId) => {
    try {
      const response = await axios.put(
        `https://highleveltecknology.com/Qtap/api/campaigns/${campaignId}`,
        {
          name: name.trim(),
          commission: parseFloat(commission),
          limit: parseInt(limit),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      toast.success(t("campaignUpdateSucc"));
      getCampaigns();
      setEditingCampaign(null);
      setName("");
      setCommission("");
      setLimit("");
      setOpenForm(false);
    } catch (error) {
      console.error("Error editing campaign:", error);
      const errorMessage =
        error.response?.data?.message || t("errorUpdateCampaign");
      toast.error(errorMessage);
    }
  };

  const openEditForm = (campaign) => {
    setEditingCampaign(campaign.id);
    setName(campaign.name);
    setCommission(campaign.commission);
    setLimit(campaign.limit);
    setOpenForm(true);
  };

  return (
    <Paper sx={{ borderRadius: "20px", padding: "10px 20px", height: "250px" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "14px", color: "#575756" }}
          >
            {t("campaigns")}
          </Typography>
          <Box>
            <IconButton
              onClick={toggleForm}
              sx={{
                color: "#ef7d00",
                "&:hover": { color: "darkorange" },
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        {openForm && (
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              float: "right",
              zIndex: 3,
              width: "160px",
              padding: "10px 20px",
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: "#575756", fontSize: "11px", marginBottom: "10px" }}
            >
              {editingCampaign ? t("editCampaign") : t("newCampaign")}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "9px", color: "gray" }}>
              {t("name")}
            </Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  height: "20px",
                  borderRadius: "5px",
                  fontSize: "10px",
                  color: "gray",
                },
              }}
            />
            <Typography variant="body2" sx={{ fontSize: "9px", color: "gray" }}>
              {t("commission")}
            </Typography>
            <TextField
              value={commission}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  setCommission(value);
                }
              }}
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  height: "20px",
                  borderRadius: "5px",
                  fontSize: "10px",
                  color: "gray",
                },
              }}
            />
            <Typography variant="body2" sx={{ fontSize: "9px", color: "gray" }}>
              {t("limit")}
            </Typography>
            <TextField
              value={limit}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  setLimit(value);
                }
              }}
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  height: "20px",
                  borderRadius: "5px",
                  fontSize: "10px",
                  color: "gray",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={
                  editingCampaign
                    ? () => handleEditCampaign(editingCampaign)
                    : handleAddCampaign
                }
                disabled={loading}
                variant="contained"
                sx={{
                  marginTop: "5px",
                  textAlign: "center",
                  borderRadius: "20px",
                  padding: "1px 30px",
                  fontSize: "11px",
                  backgroundColor: "#ef7d00",
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "#ef7d10" },
                }}
              >
                {loading ? t("saving") : t("save")}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            sx={{
              width: "160px",
              height: "175px",
              backgroundColor: "#222240",
              borderRadius: "20px",
              padding: "12px 15px",
              color: "white",
              position: "relative",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "8px", color: "white" }}
            >
              {t("name")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "8px", fontSize: "18px", color: "#ef7d00" }}
            >
              {campaign.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "8px", color: "white" }}
            >
              {t("commission")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "8px", fontSize: "18px", color: "#ef7d00" }}
            >
              {campaign.commission}%
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "8px", color: "white" }}
            >
              {t("affiliateNo")}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#ef7d00" }}
            >
              {campaign.limit}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton sx={{ color: "white" }}>
                <span
                  className="icon-delete"
                  style={{ fontSize: "15px" }}
                  onClick={() => handleDeleteCampaign(campaign.id)}
                ></span>
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <img
                  src="/assets/setting.svg"
                  alt="icon"
                  style={{ color: "white", width: "16px", height: "16px" }}
                  onClick={() => openEditForm(campaign)}
                />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default Campaigns;