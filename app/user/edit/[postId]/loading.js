/**
 * User edit post page loading skeleton
 * Shows while the post data is being loaded for editing
 */
export default function EditPostLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-12 border-b">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Link Skeleton */}
          <div className="h-5 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
          {/* Title Skeleton */}
          <div className="h-10 md:h-12 bg-gray-200 rounded w-56 animate-pulse" />
        </div>
      </section>

      {/* Editor Section Skeleton */}
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_350px] gap-6">
            {/* Main Content Area Skeleton */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Title Input Skeleton */}
                <div className="border-b border-gray-200 px-8 pt-8 pb-4">
                  <div className="h-12 md:h-14 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>

                {/* Editor Toolbar Skeleton */}
                <div className="border-b border-gray-200 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-8 h-8 bg-gray-100 rounded animate-pulse" />
                    ))}
                  </div>
                </div>

                {/* Editor Content Skeleton */}
                <div className="p-8 min-h-[500px]">
                  <div className="space-y-4">
                    {/* Paragraph Skeletons */}
                    {[...Array(6)].map((_, blockIndex) => (
                      <div key={blockIndex} className="space-y-3">
                        {blockIndex % 3 === 0 && (
                          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
                        )}
                        <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                        <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                        <div className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-4">
              {/* Publish Card Skeleton */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-12 w-full bg-gray-300 rounded-lg mb-3 animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>

              {/* Settings Card Skeleton */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="space-y-4">
                  {/* Excerpt Field Skeleton */}
                  <div>
                    <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-20 w-full bg-gray-100 rounded-md animate-pulse" />
                  </div>

                  {/* Slug Field Skeleton */}
                  <div>
                    <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
                  </div>

                  {/* Category Field Skeleton */}
                  <div>
                    <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
                  </div>

                  {/* Tags Field Skeleton */}
                  <div>
                    <div className="h-4 w-12 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
                  </div>

                  {/* Featured Image Field Skeleton */}
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}