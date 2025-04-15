import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

function LargCategoriesList({ categories, setDropdown }) {
  const renderCategories = (categories) => {
    return (
      <ul className="bg-white">
        {categories.map((category) => (
          <li key={category.category_id} className="relative group">
            {/* Main Category */}
            <Link
              href={`/category-products/?category_id=${category.category_id}&category_name=${category.category_name}`}
              onClick={() => { 
                setDropdown(false);
              }}
              className={`flex items-center shadow-md mt-2 h-16 w-64 justify-between px-4 ${
                category.isSelected
                  ? "bg-primary text-white font-extrabold"
                  : "bg-white"
              }`}
            >
              {category.category_name}
              <MdKeyboardArrowRight />
            </Link>

            {/* Render Child Categories */}
            {category.children?.length > 0 && (
              <div className="child-menu shadow-md opacity-0 pointer-events-none absolute top-0 -right-40 bg-white transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
                {renderCategories(category.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderCategories(categories)}</div>;
}

export default LargCategoriesList;
