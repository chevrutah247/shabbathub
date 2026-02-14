export default function PublicationLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

      {/* Header skeleton */}
      <div className="flex gap-6 mb-8">
        <div className="w-32 h-44 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse w-1/3"></div>
        </div>
      </div>

      {/* Issues grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
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
