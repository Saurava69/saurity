/**
 * Global loading skeleton
 * Shows during route transitions across the entire app
 */
export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Loading Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 animate-loading-bar" />
        </div>
      </div>

      {/* Page Content Skeleton */}
      <div className="pt-16">
        {/* Hero Section Skeleton */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-[1192px] mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="h-12 md:h-16 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6 animate-pulse" />
              <div className="space-y-3 mb-8">
                <div className="h-6 bg-gray-100 rounded w-full mx-auto animate-pulse" />
                <div className="h-6 bg-gray-100 rounded w-5/6 mx-auto animate-pulse" />
                <div className="h-6 bg-gray-100 rounded w-2/3 mx-auto animate-pulse" />
              </div>
              <div className="flex justify-center gap-4">
                <div className="h-12 w-36 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-12 w-36 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section Skeleton */}
        <section className="py-16 bg-white">
          <div className="max-w-[1192px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}