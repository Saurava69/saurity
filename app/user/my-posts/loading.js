/**
 * User my-posts page loading skeleton
 * Shows while the user's posts data is being loaded
 */
export default function MyPostsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 md:h-12 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
          <div className="h-5 bg-gray-100 rounded w-80 animate-pulse" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse" />
              <div className="h-9 bg-gray-300 rounded w-12 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Action Bar Skeleton */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Tabs Skeleton */}
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
            {/* Write Button Skeleton */}
            <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Posts List Skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Thumbnail Skeleton */}
                <div className="w-32 h-24 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse" />

                {/* Content Skeleton */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      {/* Title and Status */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-7 bg-gray-200 rounded w-3/4 animate-pulse" />
                        <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
                      </div>
                      {/* Excerpt */}
                      <div className="space-y-2 mb-3">
                        <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                      </div>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Actions Skeleton */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="h-9 w-24 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}