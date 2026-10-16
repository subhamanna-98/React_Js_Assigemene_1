import type React from "react";

import { useNavigate } from "react-router-dom";
import type { SubPRoductpropsc } from "../type/ComponanteTypr";
// import Product from "../pages/Product";

const SubproductComponante: React.FC<SubPRoductpropsc> = ({ item }) => {
    const navigate = useNavigate()
  return (
    <div
      key={item.id}
      className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
    >
      <div>
        {/* Product Image */}
        <div className="h-48 w-full bg-white rounded-xl flex items-center justify-center p-4 overflow-hidden relative">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Tag */}
          <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded capitalize">
            {item.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mt-4 space-y-1.5">
          <h2
            title={item.title}
            className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors"
          >
            {item.title}
          </h2>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span className="flex items-center text-amber-500 font-bold">
            ★ {item.rating?.rate}
          </span>
          <span className="text-slate-300">•</span>
          <span>({item.rating?.count} reviews)</span>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-medium">
            Price
          </span>
          <span className="text-lg font-extrabold text-slate-900">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <button
        onClick={(() => navigate(`/product/${item.id}`))}
          type="button"
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default SubproductComponante;
