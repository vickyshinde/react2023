import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from '../components/Shared/Loader';
import UserListingAdv1 from '../components/users/UserListingAdv1';
import UserEdit from '../components/users/UserEdit';
import Form from '../components/Form/Form';
import Form2 from '../components/Form/Form2';

const ErrorPage = lazy(() => import('../components/ErrorPage/ErrorPage'));
const Layout = lazy(() => import('../components/Layout/Layout'));
const UserAdd = lazy(() => import('../components/users/UserAdd'));
const UserListing = lazy(() => import('../components/users/UserListing'));
const UserListingAdv = lazy(() => import('../components/users/UserListingAdv'));
const UserAddMongo = lazy(() => import('../components/users/UserAddMongo'));
const ReduxCrudList = lazy(() => import('../components/reduxCrud/reduxCrudList'));
const ReduxCrudAdd = lazy(() => import('../components/reduxCrud/reduxCrudAdd'));
const ReduxCrudEdit = lazy(() => import('../components/reduxCrud/reduxCrudEdit'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ErrorPage />} />
            <Route path="/user-listing" element={<UserListing />} />
            <Route path="/user-listing-adv" element={<UserListingAdv />} />
            <Route path="/user-listing-adv1" element={<UserListingAdv1 />} />
            <Route path="/user-add" element={<UserAdd />} />
            <Route path="/user-edit/:id" element={<UserEdit />} />
            <Route path="/form" element={<Form />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/user-add-mongo" element={<UserAddMongo />} />
            <Route path="/redux-crud-list" element={<ReduxCrudList />} />
            <Route path="/redux-crud-add" element={<ReduxCrudAdd />} />
            <Route path="/redux-crud-edit/:id" element={<ReduxCrudEdit />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
