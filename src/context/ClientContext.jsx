import React, { createContext, useContext, useState } from "react";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState({
    personalInfo: {
      fullName: "",
      phone: "",
      email: "",
      year: "",
      month: "",
      day: "",
      country: "",
      password: "",
      confirmPassword: "",
      website: "",
      img: "",
    },
    businessInfo: {
      businessName: "",
      contactInfo: {
        businessPhone: "",
        businessEmail: "",
        facebook: "",
        twitter: "",
        instagram: "",
        address: "",
        website: "",
      },
      country: "",
      city: "",
      currency: "1",
      businessType: "",
      menuLanguage: "",
      numberOfTables: "1",
      design: "grid",
      mode: "white",
      workSchedules: {
        Saturday: ["9am", "7pm"],
        Sunday: ["9am", "7pm"],
        Monday: ["9am", "7pm"],
        Tuesday: ["9am", "7pm"],
        Wednesday: ["9am", "7pm"],
        Thursday: ["9am", "7pm"],
        Friday: ["9am", "7pm"],
      },
      servingWays: { dine_in: false, take_away: false, delivery: false },
      paymentMethods: { cash: false, wallet: false, card: false },
      paymentTime: { beforeServing: true, afterServing: false },
      callWaiter: false,
    },
    branches: [], // For multi-branch support if needed
    selectedBranch: 0,
  });

  const updatePersonalData = (updates) => {
    setClientData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates },
    }));
  };

  const updateBusinessData = (updates) => {
    if (clientData.branches.length > 0 && clientData.selectedBranch !== null) {
      const updatedBranches = [...clientData.branches];
      updatedBranches[clientData.selectedBranch] = {
        ...updatedBranches[clientData.selectedBranch],
        ...updates,
      };
      setClientData((prev) => ({ ...prev, branches: updatedBranches }));
    } else {
      setClientData((prev) => ({
        ...prev,
        businessInfo: { ...prev.businessInfo, ...updates },
      }));
    }
  };

  const selectBranch = (index) => {
    setClientData((prev) => ({ ...prev, selectedBranch: index }));
  };

  const clearClientData = () => {
    setClientData({
      personalInfo: {
        fullName: "",
        phone: "",
        email: "",
        year: "",
        month: "",
        day: "",
        country: "",
        password: "",
        confirmPassword: "",
        website: "",
        img: "",
      },
      businessInfo: {
        businessName: "",
        contactInfo: {
          businessPhone: "",
          businessEmail: "",
          facebook: "",
          twitter: "",
          instagram: "",
          address: "",
          website: "",
        },
        country: "",
        city: "",
        currency: "1",
        businessType: "",
        menuLanguage: "",
        numberOfTables: "1",
        design: "grid",
        mode: "light",
        workSchedules: {
          Saturday: ["9am", "7pm"],
          Sunday: ["9am", "7pm"],
          Monday: ["9am", "7pm"],
          Tuesday: ["9am", "7pm"],
          Wednesday: ["9am", "7pm"],
          Thursday: ["9am", "7pm"],
          Friday: ["9am", "7pm"],
        },
        servingWays: { dine_in: false, take_away: false, delivery: false },
        paymentMethods: { cash: false, wallet: false, card: false },
        paymentTime: { beforeServing: true, afterServing: false },
        callWaiter: false,
      },
      branches: [],
      selectedBranch: 0,
    });
  };

  return (
    <ClientContext.Provider
      value={{
        clientData,
        setClientData,
        updatePersonalData,
        updateBusinessData,
        selectBranch,
        clearClientData,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);