import { useDispatch, useSelector } from "react-redux";
import productsTableColumn from "../constants/productsTableColumn";
import { RootState } from "../redux/rootReducer";
import { getAllProducts } from "../redux/products/productActions";
import { AppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import { ProductQuery } from "../types/product";

const ProductsTable = () => {
  const [sortOrder, setSortOrder] = useState(true);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState<ProductQuery>({});

  const dispatch = useDispatch<AppDispatch>();

  const { loading, products, error } = useSelector(
    (state: RootState) => state.product
  );

  const sortData = (sortKey: string) => {
    const sort = { [sortKey]: sortOrder ? -1 : 1 } as { [key: string]: 1 | -1 };

    setSortOrder(!sortOrder);
    setQuery({ ...query, sort });
  };

  const getLimitedData = (e) => {
    const limit = e.target.value;

    setLimit(e.target.value);
    setQuery({ ...query, limit });
  };

  const getFilteredData = () => {
    console.log(filters);
    setQuery({ ...query, filters });
  };

  useEffect(() => {
    dispatch(getAllProducts(query));
  }, [query, dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex">
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
            onChange={(e) => getLimitedData(e)}
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
