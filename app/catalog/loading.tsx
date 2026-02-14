export default function CatalogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse max-w-xl"></div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
