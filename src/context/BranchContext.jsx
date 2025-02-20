import React, { createContext, useState, useContext } from 'react';

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [discountContent, setDiscountContent] = useState(null);

  return (
    <BranchContext.Provider value={{
      branches, setBranches,
      selectedBranch, setSelectedBranch,
      discountContent, setDiscountContent
      
    }}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};