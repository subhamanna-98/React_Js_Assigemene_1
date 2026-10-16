import axios from "axios";
import { useEffect, useState } from "react";
import type { ProductInterface } from "../interface/ProductInterface";
import SubproductComponante from "../componantes/SubproductComponante";

const Product = () => {
  const [error, setError] = useState<string>("");
  const [lodaing, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const respone = await axios.get<ProductInterface[]>(
          "https://fakestoreapi.com/products",
        );
        console.log("respone", respone);
        setProduct(respone?.data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                E-Commerce Store
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Featured Products
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Explore our wide range of products at the best prices.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
              Total Products:{" "}
              <span className="text-indigo-600 font-bold">
                {product.length}
              </span>
            </span>
          </header>

          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-center space-y-1 max-w-lg mx-auto">
              <p className="text-sm font-semibold text-rose-700">
                Failed to load data
              </p>
              <p className="text-xs text-rose-500">{error}</p>
            </div>
          )}

          {/* Products Grid & Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {lodaing
              ? // Skeleton Loader Cards
                [...Array(8)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-4 animate-pulse"
                  >
                    <div className="h-48 bg-slate-100 rounded-xl w-full" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-5 bg-slate-200 rounded w-full" />
                      <div className="h-4 bg-slate-100 rounded w-2/3" />
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <div className="h-6 bg-slate-200 rounded w-1/4" />
                      <div className="h-8 bg-slate-200 rounded w-1/3" />
                    </div>
                  </div>
                ))
              : // Product Cards
                product.map((item) => (
                  <SubproductComponante key={item.id} item={item} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
