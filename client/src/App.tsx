import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import { MainLayout } from "@/MainLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Stores
import { useAuth } from "@/store/authStore.js";
import { useCart } from "@/store/cartStore.js";

// Contexts
import { CategoryProvider } from "@/context/CategoryContext.js";
import { FilterProvider } from "@/context/FilterContext.js";
import { PurchaseProvider } from "@/context/PurchaseContext";

//Pages
import { Home } from "@/pages/Home.tsx";
import { Ropa } from "@/pages/Ropa.js";
import { ProductDetail } from "@/pages/ProductDetail.js";
import { Cart } from "@/pages/Cart.js";
import { ProtectedRoute } from "@/ProtectedRoute.js";
import { ProtectedRouteAdmin } from "@/ProtectedRouteAdmin.jsx";
import { Layout } from "@/pages/Admin.tsx";
import { AboutUs } from "@/pages/AboutUs.tsx";
import { WIshList } from "@/pages/WIshList";
import { Success } from "@/pages/Success";
import { Profile } from "@/pages/Profile";
import { Offers } from "@/pages/Offers";
import { OfferDetailPage } from "@/pages/OfferDetailPage";
import { Accessories } from "@/pages/Accessories";
import { TermsAndConditions } from "@/pages/TermsAndConditions";
import { TwoFactorVerification } from "@/pages/TwoFactorVerification";
import { VerifySmsLogin } from "@/pages/VerifySmsLogin";
import { VerifyEmailLogin } from "@/pages/VerifyEmailLogin";
import { VerifyCodeLoginSuccess } from "@/pages/VerifyCodeLoginSuccess";

// Components
import { UpdateProduct } from "@/components/admin/playground/createProduct/UpdateProduct";
import {Orders} from '@/components/admin/others/orders/Orders';
import { AdminSells } from "@/components/admin/AdminSells.tsx";
import { AdminStock } from "@/components/admin/playground/stock/AdminStock";
import { AdminAddUser } from "@/components/admin/playground/addUSer/AdminAddUser";
import { Product3DModel } from "@/components/products/Product3DModel";
import { AdminOffers } from "@/components/admin/others/offers/AdminOffers";
import { AdminUsers } from "@/components/admin/others/admins/AdminUsers";
import { AdminNews } from "@/components/admin/others/news/AdminNews";
import { OfferDetail } from "@/components/admin/others/offers/OfferDetail";
import { OfferForm } from "./components/admin/others/offers/OfferForm";
import {Categories} from '@/components/admin/others/categories/Categories'

//Shadcn
import { ThemeProvider } from "@/components/theme-provider";
import { Page } from "@/components/admin/AdminContent.tsx";
import Login from "@/pages/Login.js";
import Register from "@/pages/Register.js";

//Charts
import { ChartAreaInteractive } from "@/components/admin/Statistics/sells/SellsStats";
import { Dashboard } from "./components/profile/Dashboard";
import { WishList } from "./components/profile/WishList";
import Notifications from "./components/profile/Notifications";
import { Settings } from "./components/profile/Settings";
import { PurchaseDetail } from "./components/profile/PurchaseDetail";
import { NotFound } from "./pages/NotFound";
import { useEffect } from "react";
import { Reviews } from "./pages/Reviews";
import { PendingReviews } from "./pages/PendingReviews";
import { EditReview } from "./pages/EditReview";
import { News } from "./pages/News";
import { NewForm } from "./components/admin/others/news/NewForm";


function App() {
  const checkLogin = useAuth((state) => state.checkLogin);
  const startCart = useCart((state) => state.initializeCart);

  useEffect(() => {
    checkLogin();
    startCart();
  }, []);

  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/model3d",
          element: <Product3DModel />,
        },
        {
          path: "/register-page",
          element: <Register />,
        },
        {
          path: "/login-page",
          element: <Login />,
        },
        {
          path: "/ropa-page",
          element: <Ropa />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/product-detail/:id",
          element: <ProductDetail />,
        },
        {
          path: "/offers",
          element: <Offers />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/accessories/",
          element: <Accessories />,
        },
        {
          path: "/offers/termsAndConditions/",
          element: <TermsAndConditions />,
        },
        {
          path: "/offers/:id",
          element: <OfferDetailPage />,
        },

        {
          path: "/two-steps-factor/:id",
          element: <TwoFactorVerification />,
        },
        {
          path: "/two-steps-factor/:id/verify-code-sms",
          element: <VerifySmsLogin />,
        },
        {
          path: "/two-steps-factor/:id/verify-code-email",
          element: <VerifyEmailLogin />,
        },
        {
          path: "/two-steps-factor/:id/success",
          element: <VerifyCodeLoginSuccess />,
        },
        {
          path: "/two-steps-factor",
          element: <TwoFactorVerification />,
        },
        {
          path: "/two-steps-factor/verify-code-sms",
          element: <VerifySmsLogin />,
        },
        {
          path: "/two-steps-factor/verify-code-email",
          element: <VerifyEmailLogin />,
        },
        {
          path: "/two-steps-factor/success",
          element: <VerifyCodeLoginSuccess />,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />, // También puedes envolver rutas protegidas con el layout si aplica
          children: [
            {
              path: "/cart",
              element: <Cart />,
            },
            {
              path: "/wishList",
              element: <WIshList />,
            },
            {
              path: "/success",
              element: <Success />,
            },
          ],
        },
        {
          path: "/profile",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "purchases",
              element: <Dashboard />,
            },
            {
              path: "purchases/:id",
              element: <PurchaseDetail />,
            },
            {
              path: "wishlist",
              element: <WishList />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "reviews",
              element: <Reviews />,
            },
            {
              path: "pending-reviews",
              element: <PendingReviews />,
            },
            {
              path: "pending-reviews/:id",
              element: <EditReview />,
            },

          ],
        },
      ],
    },
    {
      element: <ProtectedRouteAdmin />,
      children: [
        {
          path: "/admin",
          element: <Layout />,
          errorElement: <ErrorBoundary />,
          children: [
            {
              index: true,
              element: <Page />,
            },
            {
              path: "playground/stock",
              element: <AdminStock />,
            },
            {
              path: "playground/sells",
              element: <AdminSells />,
            },
            {
              path: "playground/addUserAdmin",
              element: <AdminAddUser />,
            },
            {
              path: "playground/update-product/:id",
              element: <UpdateProduct />,
            },
            {
              path: "playground/create-product",
              element: <UpdateProduct />,
            },
            {
              path: "stats/sells",
              element: <ChartAreaInteractive />,
            },
            {
              path: "settings/offers",
              element: <AdminOffers />,
            },
            {
              path: "settings/offers/create",
              element: <OfferForm />,
            },
            {
              path: "settings/offers/create/:id",
              element: <OfferForm />,
            },
            {
              path: "settings/offers/:id",
              element: <OfferDetail />,
            },
            {
              path: "settings/news",
              element: <AdminNews />,
            },
            {
              path: "settings/news/create",
              element: <NewForm />,
            },
            {
              path: "settings/news/create/:id",
              element: <NewForm />,
            },
            {
              path: "settings/orders",
              element: <Orders />,
            },
            {
              path: "settings/admins",
              element: <AdminUsers />,
            },
            {
              path: "settings/categories",
              element: <Categories />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
  const onRedirectCallback = (appState?: any) => {
    const target = appState?.returnTo || window.location.pathname;
    window.history.replaceState({}, document.title, target);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/register-page",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <ThemeProvider>
        <CategoryProvider>
          <FilterProvider>
            <PurchaseProvider>
              <ErrorBoundary>
                <RouterProvider router={router} />
              </ErrorBoundary>
            </PurchaseProvider>
          </FilterProvider>
        </CategoryProvider>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
