import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from '../components/Shared/Loader';
import UserListingAdv1 from '../components/users/UserListingAdv1';
import UserEdit from '../components/users/UserEdit';

const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'));
const Layout = lazy(() => import('../components/Layout/Layout'));
const UserAdd = lazy(() => import('../components/users/UserAdd'));
const UserListing = lazy(() => import('../components/users/UserListing'));
const UserListingAdv = lazy(() => import('../components/users/UserListingAdv'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <ErrorPage />
              </Suspense>
            }
          />
          <Route
            path="/user-listing"
            element={
              <Suspense fallback={<Loader />}>
                <UserListing />
              </Suspense>
            }
          />
          <Route
            path="/user-listing-adv"
            element={
              <Suspense fallback={<Loader />}>
                <UserListingAdv />
              </Suspense>
            }
          />
          <Route
            path="/user-listing-adv1"
            element={
              <Suspense fallback={<Loader />}>
                <UserListingAdv1 />
              </Suspense>
            }
          />
          <Route
            path="/user-add"
            element={
              <Suspense fallback={<Loader />}>
                <UserAdd />
              </Suspense>
            }
          />
          <Route
            path="/user-edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <UserEdit />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <ErrorPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
