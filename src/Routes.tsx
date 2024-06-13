import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import About from "./pages/About";
import AddProduct from "./pages/Products/Add";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ProductList from "./pages/Products/List";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
        <Route path="contact" element={<Contact />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
