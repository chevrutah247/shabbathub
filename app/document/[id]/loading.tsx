export default function DocumentLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="grid md:grid-cols-[1fr_350px] gap-8">
        {/* PDF viewer skeleton */}
        <div className="aspect-[3/4] bg-gray-200 rounded-xl animate-pulse"></div>

        {/* Info sidebar skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
          <div className="mt-6 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
