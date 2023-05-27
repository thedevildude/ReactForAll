import { useState } from "react";

interface Props {
  count: number;
  offset: number;
  limit: number;
  setOffsetCB: (value: number) => void;
}

export default function FormPagination(props: Props) {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(selected - 1) * props.limit + 1}</span> to{" "}
            <span className="font-medium">{(selected - 1) * props.limit + props.limit}</span> of{" "}
            <span className="font-medium">{props.count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {Array.from(
              { length: Math.ceil(props.count / props.limit) },
              (_, index) => (
                <button
                  key={index} // 0-indexed
                  aria-current="page"
                  onClick={() => {
                    props.setOffsetCB((index) * props.limit); // 0-indexed
                    setSelected(index + 1); // 1-indexed
                  }}
                  className={`relative z-10 inline-flex items-center ${
                    selected === index + 1
                      ? "bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  } px-4 py-2 text-sm font-semibold`}
                >
                  {index + 1}
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
