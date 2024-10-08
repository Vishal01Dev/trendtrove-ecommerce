import {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import PathRoute from "../../components/pathRoute/PathRoute";
import { Dialog, Disclosure, Transition } from "@headlessui/react";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import MultiRangeSlider from "../../components/rangeSlider/MultiRangeSlider";
import ProductCard from "../../components/cards/ProductCard";
import { FaFilter } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAllProducts } from "../../redux/product/productSlice";
import { FiltersType, ProductType } from "../../utils/types";
import {
  filteredProductsAsync,
  filterOptionsAsync,
  selectFilteredProducts,
  selectFilters,
  selectShopStatus,
  selectTotalProductsCount,
} from "../../redux/shop/shopSlice";
import Button from "../../components/common/Button";
import SelectMenu from "../../components/selectMenu/SelectMenu";
import useDebounce from "../../hooks/useDebounce";

type FilterOption = {
  value: string;
  label: string;
  checked: boolean;
};

type Section = {
  id: string;
  name: string;
  options: FilterOption[];
};

type Filters = {
  [key: string]: string[];
};

interface SortOption {
  name: string;
  sort: string;
  order: string;
  current: boolean;
}

const sortOptions: SortOption[] = [
  { name: "Select one", sort: "", order: "", current: true },
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const Shop = () => {
  const dispatch = useAppDispatch();
  const ITEMS_PER_PAGE = 12;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType | null>(null);
  const [promptFilters, setPromptFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState<
    ProductType[] | null
  >(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    sortOptions[0]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleQueryFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(
        filteredProductsAsync({
          ...promptFilters,
          query: debouncedSearchTerm,
        })
      );
    }
  }, [debouncedSearchTerm, dispatch, promptFilters]);

  const formRef = useRef<HTMLFormElement>(null);

  const products = useAppSelector(selectAllProducts);
  const filterOptions = useAppSelector(selectFilters);
  const filteredItems = useAppSelector(selectFilteredProducts);
  const totalItems = useAppSelector(selectTotalProductsCount);

  useEffect(() => {
    dispatch(filteredProductsAsync({}));
    dispatch(filterOptionsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilters(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    setFilteredProducts(filteredItems);
  }, [filteredItems]);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    const pagination = { page: page, limit: ITEMS_PER_PAGE };
    dispatch(
      filteredProductsAsync({ ...promptFilters, ...pagination, ...sort })
    );
  }, [dispatch, page, promptFilters, sort]);

  const handleFilters = (
    e: ChangeEvent<HTMLInputElement>,
    section: Section,
    option: FilterOption,
    subcategory?: string
  ) => {
    const newFilter: Filters = { ...promptFilters };
    if (e.target.checked) {
      if (subcategory) {
        if (newFilter[subcategory]) {
          newFilter[subcategory].push(option.value);
        } else {
          newFilter[subcategory] = [option.value];
        }
      } else {
        if (newFilter[section.id]) {
          newFilter[section.id].push(option.value);
        } else {
          newFilter[section.id] = [option.value];
        }
      }
    } else {
      if (subcategory) {
        if (newFilter[subcategory]) {
          const index = newFilter[subcategory].findIndex(
            (el) => el === option.value
          );
          if (index !== -1) {
            newFilter[subcategory].splice(index, 1);
          }
        }
      }
      if (newFilter[section.id]) {
        const index = newFilter[section.id].findIndex(
          (el) => el === option.value
        );
        if (index !== -1) {
          newFilter[section.id].splice(index, 1);
        }
      }
    }
    setPromptFilters(newFilter);
  };

  const handlePriceFilters = (min: number, max: number) => {
    dispatch(
      filteredProductsAsync({
        ...promptFilters,
        minPrice: min.toString(),
        maxPrice: max.toString(),
      })
    );
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleSorting = (option: SortOption) => {
    const sort = { sortBy: option.sort, sortType: option.order };
    setSort(sort);
    setSelectedOption(option);
  };

  const handleResetFilters = () => {
    dispatch(filteredProductsAsync({ page, limit: ITEMS_PER_PAGE }));
    setPromptFilters({});
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const shopStatus = useAppSelector(selectShopStatus);

  const [status, setStatus] = useState<string>("Idle");

  useEffect(() => {
    setStatus(shopStatus);
  }, [shopStatus]);

  return (
    <div className="sm:mt-5 mb-20">
      <PathRoute path="Shop" />

      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form action="" className="my-5">
                  <div className="grid  gap-y-5 sm:gap-8 md:gap-0 md:grid-cols-1 px-5">
                    <div>
                      <div className="mb-4">
                        <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                          Categories
                        </h2>
                        <hr className="bg-primary border-none w-1/4 h-0.5" />
                      </div>
                      {filters?.categoryOptions.map((section) => (
                        <Disclosure as="div" key={section.id} className="py-4">
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-2 text-gray-400 hover:text-gray-500">
                                  <span className=" font-medium text-secondary">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <ChevronUpIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <ChevronDownIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-4 pl-2 ">
                                <div className="space-y-2">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center cursor-pointer"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleFilters(
                                            e,
                                            section,
                                            option,
                                            "subcategory"
                                          )
                                        }
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                    <div>
                      <div className="my-4">
                        <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                          Filter by Price
                        </h2>
                        <hr className="bg-primary border-none w-1/4 h-0.5" />
                      </div>

                      <MultiRangeSlider
                        min={1}
                        max={500}
                        handlePriceFilters={handlePriceFilters}
                      />
                    </div>
                    <div>
                      <div className="my-4">
                        <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                          Filter by Sizes
                        </h2>
                        <hr className="bg-primary border-none w-1/4 h-0.5" />
                      </div>
                      {filters?.sizeOptions.map((section, optionIdx) => (
                        <div className="space-y-2 py-4" key={optionIdx}>
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                onChange={(e) =>
                                  handleFilters(e, section, option)
                                }
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="my-4">
                        <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                          Filter by Colors
                        </h2>
                        <hr className="bg-primary border-none w-1/4 h-0.5" />
                      </div>
                      {filters?.colorOptions.map((section, index) => (
                        <div className="space-y-2 py-4" key={index}>
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center cursor-pointer"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                onChange={(e) =>
                                  handleFilters(e, section, option)
                                }
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mb-5 md:hidden">
        <div
          onClick={() => setMobileFiltersOpen(true)}
          className="px-4 py-2 w-fit text-sm ml-auto font-medium bg-gray-100 rounded-md flex justify-center items-center gap-x-2"
        >
          <FaFilter size={12} />
          <p>Filters</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-y-10 sm:gap-10">
        <div className="hidden col-span-12 md:block md:col-span-3">
          <form action="" ref={formRef}>
            <div className="grid sm:grid-cols-2 gap-y-5 sm:gap-8 md:gap-0 md:grid-cols-1">
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                      Categories
                    </h2>
                    <hr className="bg-primary border-none w-1/4 h-0.5" />
                  </div>
                  {Object.keys(promptFilters).length > 0 && (
                    <Button
                      title="Reset Filters"
                      type="button"
                      onClick={handleResetFilters}
                      buttonStyles="bg-gray-200 rounded !text-sm !px-2 !py-1"
                    />
                  )}
                </div>
                {filters?.categoryOptions.map((section) => (
                  <Disclosure as="div" key={section.id} className="py-4">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-2 text-gray-400 hover:text-gray-500">
                            <span className=" font-medium text-secondary">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-4 pl-2 ">
                          <div className="space-y-2">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center cursor-pointer"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleFilters(
                                      e,
                                      section,
                                      option,
                                      "subcategory"
                                    )
                                  }
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
              <div>
                <div className="my-4">
                  <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                    Filter by Price
                  </h2>
                  <hr className="bg-primary border-none w-1/4 h-0.5" />
                </div>
                <MultiRangeSlider
                  min={1}
                  max={500}
                  handlePriceFilters={handlePriceFilters}
                />
              </div>
              <div>
                <div className="my-4">
                  <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                    Filter by Sizes
                  </h2>
                  <hr className="bg-primary border-none w-1/4 h-0.5" />
                </div>
                {filters?.sizeOptions.map((section, index) => (
                  <div className="space-y-2 py-4" key={index}>
                    {section.options.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilters(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                <div className="my-4">
                  <h2 className="uppercase tracking-wide text-lg sm:text-xl font-semibold">
                    Filter by Colors
                  </h2>
                  <hr className="bg-primary border-none w-1/4 h-0.5" />
                </div>
                {filters?.colorOptions.map((section, index) => (
                  <div className="space-y-2 py-4" key={index}>
                    {section.options.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilters(e, section, option)}
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-6 gap-5">
            <input
              type="search"
              name="search"
              id="search"
              onChange={(e) => handleQueryFilter(e)}
              placeholder="Search something"
              className="bg-gray-100 px-4 py-2.5 rounded w-full sm:w-[250px] border-none text-secondary focus:outline-none text-sm font-medium focus:ring-0"
            />
            <SelectMenu
              options={sortOptions}
              selectedOption={selectedOption}
              onChange={handleSorting}
              getOptionLabel={(option) => option.name}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8 mb-5">
            {status === "loading" ? (
              <p className="font-semibold text-2xl text-gray-600">Loading...</p>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div>
                <p className="font-semibold text-xl">No products found!</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </div>
              <div
                onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(page - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {page * ITEMS_PER_PAGE > totalItems
                      ? totalItems
                      : page * ITEMS_PER_PAGE}
                  </span>{" "}
                  of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <div
                    onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                    className="relative inline-flex items-center rounded-l-md cursor-pointer px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  {Array.from({ length: totalPages }).map((el, index) => (
                    <div
                      key={index}
                      onClick={(e) => handlePage(index + 1)}
                      aria-current="page"
                      className={`
                    relative z-10 inline-flex items-center ${
                      index + 1 === page
                        ? "bg-primary text-white"
                        : "bg-white text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    } ring-gray-300 px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer`}
                    >
                      {index + 1}
                    </div>
                  ))}
                  <div
                    onClick={(e) =>
                      handlePage(page < totalPages ? page + 1 : page)
                    }
                    className="relative inline-flex items-center rounded-r-md px-2 cursor-pointer py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
