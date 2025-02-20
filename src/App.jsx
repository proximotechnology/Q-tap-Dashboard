import './App.css';
import { BranchesPage } from './Component/Branches/BranchesPage';
import { BusinessInfoPage } from './Component/Business-info/BusinessInfoPage';
import { DashboardHome } from './Pages/DashboardHome/DashboardHome';
import { PasswordResetPage } from './Component/PasswordReset/PasswordResetPage';
import { PaymentPage } from './Component/payment/PaymentPage';
import { ResetPage } from './Component/reset/ResetPage';
import { ServingWaysPage } from './Component/serving Ways/ServingWaysPage';
import { HomePage } from './Pages/HomePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/DashboardHome/Home/Home';
import Product from "./Pages/product/Product" ; 
import Client from './Pages/Client/Client' ; 
import Wallet from './Pages/Wallet/Wallet' ;
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import  Support  from './Pages/Support/Support';
import { Pricing } from './Pages/Pricing/Pricing';
import { Affiliate } from './Pages/Affiliate/Affiliate';
import { Setting } from './Pages/Setting/Setting';
import { Notification } from './Pages/Notification/Notification';
import { LogoClient } from './Component/DashboardClient/LogoClient';
import { LoginAdmin } from './Component/DashboardClient/LoginAdmin';
import { OrderBody } from './Pages/DashboardClient/Order/OrderComponent/OrderBody';
import HomeClient from './Pages/DashboardClient/Pages/DashHome/HomeClient';
import { DashboardClient } from './Pages/DashboardClient/Pages/DashHome/DashboardClient';
import {Order} from './Pages/DashboardClient/Pages/Order/Order'
import { WalletClient } from './Pages/DashboardClient/Pages/WalletClient/WalletClient';
import {Menu} from './Pages/DashboardClient/Pages/Menu/Menu';
import SupportClient from './Pages/DashboardClient/Pages/SupportClient/SupportClient' ;
import {Customers} from './Pages/DashboardClient/Pages/Customers/Customers'
import { SettingClient } from './Pages/DashboardClient/Pages/SettingClient/SettingClient';
import { OrderHistory } from './Pages/DashboardClient/Order/OrderComponent/OrderHistory';
import { Transaction } from './Pages/DashboardClient/Pages/WalletClient/Transaction/Transaction';
import { User } from './Pages/DashboardClient/Pages/User/User';
import { AddItem } from './Pages/DashboardClient/Pages/Menu/AddItem';
import { Feedback } from './Pages/DashboardClient/Pages/Feedback/Feedback';
import { AddClient } from './Pages/Client/Row2/AddClient/AddClient';

import { AddUsers } from './Pages/Affiliate/AddUser/AddUser';

import HomeAffiliate from './Pages/DashboardAffiliate/Pages/DashboardHome/HomeAffiliate';
import { DashboardAffiliate } from './Pages/DashboardAffiliate/Pages/DashboardHome/DashboardAffiliate';
import { WalletAffiliate } from './Pages/DashboardAffiliate/Pages/WalletAffiliate/WalletAffiliate';
import { AddAffiliate } from './Pages/DashboardAffiliate/Pages/WalletAffiliate/AddAffiliate';
import { DeliveryLogin } from './Pages/DashboardClient/DeliveryRiders/DeliveryLogin';
import { Delivered } from './Pages/DashboardClient/DeliveryRiders/Delivered';
import MenuClient from './Pages/DashboardClient/Menu/MenuClient';
import { FeedbackAdmin } from './Pages/FeedbackAdmin/FeedbackAdmin';
import { Save } from './Component/Save/Save';
import { Welcome } from './Component/Welcome/Welcome';
import { ProductsPage } from './Component/Products/ProductsPage';
import { ToastContainer } from 'react-toastify';
import { PersonalProvider } from './context/PersonalContext';
import { BusinessProvider } from './context/BusinessContext';
import { BranchProvider } from './context/BranchContext';
import { ContentMenuProvider } from './context/ContentMenuContext';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/reset",
      element: <ResetPage />,
    },
    {
      path: "/reset-password",
      element: <PasswordResetPage />,
    },
    {
      path: "/product",
      element: <ProductsPage />,
    },
    {
      path: "/business-info",
      element: <BusinessInfoPage />,
    },
    {
      path: "/serving-ways",
      element: <ServingWaysPage />,
    },
    {
      path: "/branches",
      element: <BranchesPage />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/save",
      element: <Save/>,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/logo-cient",
      element: <LogoClient />,
    },
    {
      path: "/admin-login",
      element: <LoginAdmin />,
    },
    {
      path: "order-body",
      element: <OrderBody />,
    },
    {
      path: "order-history",
      element: <OrderHistory />,
    },
    {
      path: "order",
      element: <Order /> ,  
    },
    {
      path: "add-item",
      element: <AddItem /> ,  
    },
    {
      path: "add-client",
      element: <AddClient /> ,  
    },
    {
      path: "add-user",
      element: <AddUsers /> ,  
    },
    {
      path: "add-Affiliate",
      element: <AddAffiliate /> ,  
    },
    {
      path: "delivery-riders",
      element: < DeliveryLogin /> ,  
    },
    {
      path: "delivered",
      element: <Delivered /> ,  
    },

    {
      path: "menu-client",
      element: <MenuClient /> ,  
    },
    

    //  dashboard-Affiliate
    {
      path:"/",
      element:<HomeAffiliate />,
      children: [
        {
          index: true,
          path:"/dashboard-affiliate" , 
          element: <DashboardAffiliate />, 
        },
        {
          path: "wallet-affiliate",
          element: <WalletAffiliate /> ,  
        },
      ]
    },
    // dashboard-client 
    {
      path:"/",
      element :<HomeClient />,// صفحات الداش بورد بتاعت ال client الأساسية 
      children: [
        {
          index: true,
          path:"/dashboard-client" , 
          element: <DashboardClient />, 
        },
        {
          path: "wallet-client",
          element: <WalletClient /> ,  
        },
        {
          path: "transaction",
          element: <Transaction /> ,  
        },
        
        {
          path: "menu",
          element: <Menu /> ,  
        },

        {
          path: "support-client",
          element: <SupportClient /> ,  
        },
        {
          path: "user",
          element: <User /> ,  
        },
        {
          path: "customers-log",
          element: <Customers /> ,  
        },

        {
          path: "setting-client",
          element: <SettingClient /> ,  
        },
        
        {
          path: "feedback",
          element: <Feedback /> ,  
        },
      ]
      
    },
    // dashboard-Admin
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          path:"dashboard-home" , 
          element: <DashboardHome />, 
        },
        {
          path: "client",
          element: <Client /> ,  
        },
        {
          path: "wallet",
          element: <Wallet />,
        },
        {
          path: "product-admin",
          element: <Product />,
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "affiliate",
          element: <Affiliate />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "/feedback-admin",
          element: <FeedbackAdmin />,
        },
      ],
      errorElement: <ErrorPage />,
    },


    {
      path: "*",  
      element: <ErrorPage />,
    },
  ]);
  


  return (
    <ContentMenuProvider>
    <BranchProvider>
      <PersonalProvider>
        <BusinessProvider>
          <div style={{ minHeight: "100vh" }}>
            <div className="w-100 ">
              <RouterProvider router={routes}></RouterProvider>
            </div>
            <ToastContainer />
          </div>
        </BusinessProvider>
      </PersonalProvider>
    </BranchProvider>
  </ContentMenuProvider>
  );
}

export default App;
