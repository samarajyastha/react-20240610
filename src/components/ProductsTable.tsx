import { useDispatch, useSelector } from "react-redux";
import productsTableColumn from "../constants/productsTableColumn";
import { RootState } from "../redux/rootReducer";
import { deleteProduct } from "../redux/products/productActions";
import { AppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import { Product, ProductQuery } from "../types/product";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { resetSuccess } from "../redux/products/productSlice";
import Modal from "./Modal";

const ProductsTable = () => {
  const [sortOrder, setSortOrder] = useState(true);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [query, setQuery] = useState<ProductQuery>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { error, success, products } = useSelector(
    (state: RootState) => state.product
  );

  const sortData = (sortKey: string) => {
    const sort = { [sortKey]: sortOrder ? -1 : 1 } as { [key: string]: 1 | -1 };

    setSortOrder(!sortOrder);
    setQuery({ ...query, sort });
  };

  const getLimitedData = (limit: number) => {
    setLimit(limit);
    setQuery({ ...query, limit });
  };

  const getFilteredData = () => {
    setQuery({ ...query, filters });
  };

  const onDeleteProduct = (product: Product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const onConfirmDeleteProduct = () => {
    dispatch(deleteProduct(selectedProduct!.id));
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (error)
      toast.error(error, {
        autoClose: 1000,
      });

    if (success) {
      toast.success("Product deleted successfully.", {
        autoClose: 1000,
        onClose: () => dispatch(resetSuccess()),
      });
    }
  }, [error, success, dispatch]);

  return (
    <div className="flex">
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title="Delete Product"
        content={`Are you sure you want to delete ${selectedProduct?.name}?`}
        actions={
          <>
            <button
              className="bg-slate-500 px-5 py-1 rounded text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 px-5 py-1 rounded text-white"
              onClick={onConfirmDeleteProduct}
            >
              Delete
            </button>
          </>
        }
      />
      <div className="w-1/6 py-10 px-5 border my-8 ml-10 border-gray-300 rounded-xl border-dashed box-border">
        <h3 className="font-semibold">Filters</h3>
        <div className="py-2">
          <input
            className="border px-2 rounded"
            type="text"
            id="name"
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </div>
        <div className="py-2">
          <input
            className="border px-2 rounded"
            type="text"
            id="brand"
            placeholder="Filter by brand"
            defaultValue={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-slate-700 text-white rounded mt-10 py-1 px-6"
            onClick={getFilteredData}
          >
            Apply Filters
          </button>
        </div>
      </div>
      <div className="py-10 px-12 border my-8 mx-10 border-gray-300 rounded-xl border-dashed w-5/6">
        <table className="w-full">
          <thead>
            <tr>
              {productsTableColumn.map(({ label, key }, index) => (
                <th
                  key={index}
                  className="text-left pb-3 cursor-pointer"
                  onClick={() => sortData(key)}
                >
                  {label}
                </th>
              ))}
              <th className="text-center pb-3 cursor-pointer">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-gray-300 last:border-b-0"
              >
                <td className="py-3">{index + 1}.</td>
                <td className="py-3">{product.name}</td>
                <td className="py-3">{product.brand}</td>
                <td className="py-3">{product.category ?? "-"}</td>
                <td className="py-3">{product.price}</td>
                <td className="py-3 text-center">
                  <button className="p-2 bg-blue-500 rounded text-white mx-2">
                    <FaPencil />
                  </button>
                  <button
                    className="p-2 bg-red-500 rounded text-white mx-2"
                    onClick={() => onDeleteProduct(product)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-right">
          <label htmlFor="limit" className="mr-3">
            Limit
          </label>
          <select
            name="limit"
            id="limit"
            className="border"
            onChange={(e) => getLimitedData(parseInt(e.target.value))}
          >
            <option value="10" selected={limit == 10}>
              10
            </option>
            <option value="20" selected={limit == 20}>
              20
            </option>
            <option value="50" selected={limit == 50}>
              50
            </option>
            <option value="100" selected={limit == 100}>
              100
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
