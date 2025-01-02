import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function CategoriesList({ categories,setDropdown }) {
  const [expandedCategoryIds, setExpandedCategoryIds] = useState([]);
const router=useRouter();
const id=router.query?.category_id;
  const handleToggle = (category_id) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(category_id)
        ? prev.filter((id) => id !== category_id) // Collapse if already expanded
        : [...prev, category_id] // Expand if not already expanded
    );
  };

  const handleSelect = (category_name,) => {
    console.log(`Category selected: ${category_name}`);
    // Add your category selection logic here
    
  };

  const renderCategories = (categories ) => {
    return (
      <ul className="ml-2 mt-2 pl-4">
        {categories.map((category) => (
          <li key={category.category_id} className={`relative ${category?.category_id==id ?'text-primary' :""} `}>
            <div className="flex items-center justify-between">
              {/* Category Link */}
              <Link
                className="text-md py-2 leading-7 font-normal relative hover:border-none flex-grow"
                href={`/category-products/?category_id=${category.category_id}&category_name=${category.category_name}`}
                onClick={() =>{ handleSelect(category.category_name);setDropdown(false)}}
              >
                {category.category_name}
              </Link>
              {/* Expand/Collapse Button */}
              {category.children?.length > 0 && (
                <button
                  className="ml-2 text-xl font-bold text-gray-600 hover:text-primary"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent triggering the link
                    handleToggle(category.category_id);
                  }}
                >
                  {expandedCategoryIds.includes(category.category_id)
                    ? "-"
                    : "+"}
                </button>
              )}
            </div>
            {/* Render Nested Child Categories */}
            {expandedCategoryIds.includes(category.category_id) &&
              category.children?.length > 0 &&
              renderCategories(category.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white p-2">
      {renderCategories(categories)}
    </div>
  );
}

export default CategoriesList;
