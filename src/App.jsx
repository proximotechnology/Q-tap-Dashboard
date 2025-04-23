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
import Product from "./Pages/product/Product";
import Client from './Pages/Client/Client';
import Wallet from './Pages/Wallet/Wallet';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Support from './Pages/Support/Support';
import { Pricing } from './Pages/Pricing/Pricing';
import { Affiliate } from './Pages/Affiliate/Affiliate';
import { Setting } from './Pages/Setting/Setting';
import { Notification } from './Pages/Notification/Notification';
import { LogoClient } from './Component/DashboardClient/LogoClient';
import { LoginAdmin } from './Component/DashboardClient/LoginAdmin';
import { OrderBody } from './Pages/DashboardClient/Order/OrderComponent/OrderBody';
import HomeClient from './Pages/DashboardClient/Pages/DashHome/HomeClient';
import { DashboardClient } from './Pages/DashboardClient/Pages/DashHome/DashboardClient';
import { Order } from './Pages/DashboardClient/Pages/Order/Order'
import { WalletClient } from './Pages/DashboardClient/Pages/WalletClient/WalletClient';
import { Menu } from './Pages/DashboardClient/Pages/Menu/Menu';
import SupportClient from './Pages/DashboardClient/Pages/SupportClient/SupportClient';
import { Customers } from './Pages/DashboardClient/Pages/Customers/Customers'
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
import { RegisterClientProvider } from './context/RegisterClientContext';
import { ClientLoginDataProvider } from './context/ClientLoginDataContext';
import { ClientProvider } from './context/ClientContext';
import { AffiliateClientProvider } from './context/AffiliateClient';
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { DashboardDataProvider } from './context/DashboardDataContext';
import { MenuDataProvider } from './context/MenuDataContext';
import { LoginChef } from './Component/DashboardClient/LoginChef';
import { LoginCashier } from './Component/DashboardClient/LoginCashier';
import { LoginKitchen } from './Component/DashboardClient/LoginKitchen';
import { LoginWaiter } from './Component/DashboardClient/LoginWaiter';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />, // done
    },

    {
      path: "/reset",
      element: <ResetPage />, //  done
    },
    {
      path: "/reset-password",
      element: <PasswordResetPage />,// done
    },
    {
      path: "/product",
      element: <ProductsPage />, // done
    },
    {
      path: "/business-info",
      element: <BusinessInfoPage />, // done
    },
    {
      path: "/serving-ways",
      element: <ServingWaysPage />, // done
    },
    {
      path: "/branches",
      element: <BranchesPage />, // done
    },
    {
      path: "/payment",
      element: <PaymentPage />, // done
    },
    {
      path: "/save",
      element: <Save />, // DONE
    },
    {
      path: "/welcome",
      element: <Welcome />, // done
    },
    /// client
    {
      path: "/logo-cient",
      element: <LogoClient />, // done 
    },
    {
      path: "/admin-login",
      element: <LoginAdmin />,//  done
    },
    {
      path: "/kitchen-login",
      element: <LoginKitchen />,//  done
    },
    {
      path: "/chef-login",
      element: <LoginChef />,//  done
    },
    {
      path: "/waiter-login",
      element: <LoginWaiter />,//  done
    },
    {
      path: "/cashier-login",
      element: <LoginCashier />,//  done
    },
    {
      path: "order-body",
      element: <OrderBody />, // done
    },
    {
      path: "order-history",
      element: <OrderHistory />, // done
    },
    {
      path: "order",
      element: <Order />, // done
    },
    {
      path: "add-item",
      element: <AddItem />, // done
    },
    {
      path: "add-client",
      element: <AddClient />, // done
    },
    {
      path: "add-user",
      element: <AddUsers />, // done
    },
    {
      path: "add-Affiliate",
      element: <AddAffiliate />, // done
    },
    {
      path: "delivery-riders",
      element: <DeliveryLogin />, // done
    },
    {
      path: "delivered",
      element: <Delivered />, // done
    },

    {
      path: "menu-client", // todo: disapple pay button
      element: <MenuClient />,// TODO: style problem here  and logic modification 
    },


    //  dashboard-Affiliate
    {
      path: "/",
      element: <HomeAffiliate />,
      children: [
        {
          index: true,
          path: "/dashboard-affiliate",
          element: <DashboardAffiliate />,
        },
        {
          path: "wallet-affiliate",
          element: <WalletAffiliate />,
        },
      ]
    },
    // dashboard-client 
    {
      path: "/",
      element: <HomeClient />,// صفحات الداش بورد بتاعت ال client الأساسية 
      children: [
        {
          index: true,
          path: "/dashboard-client",
          element: <DashboardClient />,
        },
        {
          path: "wallet-client",
          element: <WalletClient />,
        },
        {
          path: "transaction",
          element: <Transaction />, // لم يتم الترجمه
        },

        {
          path: "menu",
          element: <Menu />,
        },

        {
          path: "support-client",
          element: <SupportClient />,
        },
        {
          path: "user",
          element: <User />,
        },
        {
          path: "customers-log",
          element: <Customers />,
        },

        {
          path: "setting-client",
          element: <SettingClient />,
        },

        {
          path: "feedback",
          element: <Feedback />,
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
          path: "dashboard-home",
          element: <DashboardHome />,
        },
        {
          path: "client",
          element: <Client />,
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


  useEffect(() => {
    const pusher = new Pusher('63b495891d2c3cff9d36', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('notify-channel');
    channel.bind('form-submitted', function (data) {
      console.log('📢 Received from Pusher:', data);

      // Handle different types
      switch (data?.type) {
        case 'notfy':
          // Handle notification type
          toast.info(`📢 ${data?.message?.title}: ${data?.message?.content}`);
          break;

        case 'chat':
          // Handle chat type
          {
            localStorage.getItem("adminToken") &&
            toast.success(`💬 New Message: ${data?.message?.message}`);
          }
          // Add logic to update chat UI or state
          break;

        case 'add_order':
          // Handle add_order type
          toast.warn(`🛒 New Order: ${data?.message?.orderId}`);
          // Add logic to update order UI or state
          break;

        default:
          console.warn('Unknown data type received:', data);
      }
    });

    // Cleanup on component unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <ClientProvider>
      <MenuDataProvider>
        <DashboardDataProvider>
          <AffiliateClientProvider>
            <ClientLoginDataProvider>
              <RegisterClientProvider>
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
              </RegisterClientProvider>
            </ClientLoginDataProvider>
          </AffiliateClientProvider>
        </DashboardDataProvider>
      </MenuDataProvider>
    </ClientProvider>

  );
}

export default App;
