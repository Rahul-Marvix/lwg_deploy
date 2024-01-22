import Link from "next/link";

export default function PaginationBar({
  currentPage,
  length,
  search,
  status
}) {
  const page=parseInt(currentPage)
  console.log(page+"sosmethoejhowejr");
  console.log(typeof(page));
  const isNextButtonDisabled = length < 9;
// let next=parseInt(currentPage+1)
// let prev=parseInt(currentPage-1)
  return (
    <>
      <div className="flex flex-col  items-center">
        <div className="inline-flex gap-2 mt-2 xs:mt-0">
        {page>1 &&
          <Link
          //  href={`/admin/products?page=${page-1}` }
          href={{
            pathname: "/admin/products",
            query: {
              ...(search ? { search } : {}),
              ...(status !== undefined ? { status } : {}),
              page: page - 1
            }
          }}
           >
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 ">
              Prev
            </button>
          </Link>
}
          {!isNextButtonDisabled && <Link 
          // href={ `/admin/products?page=${page+1}`}
          href={{
            pathname: "/admin/products",
            query: {
              ...(search ? { search } : {}),
              ...(status !== undefined ? { status } : {}),
              page: page + 1
            }
          }}
          >
            <button
              className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-md ${
                isNextButtonDisabled ? 'pointer-events-none opacity-50' : 'hover:bg-gray-900 '
              }`}
            >
              Next
            </button>
          </Link>}
       
        </div>
      </div>
    </>
  );
}
