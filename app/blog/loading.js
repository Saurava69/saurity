/**
 * Blog listing page loading skeleton
 * Shows while the blog posts are being fetched
 */
export default function BlogLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="max-w-[728px] mx-auto">
            <div className="h-14 md:h-16 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Search Section Skeleton */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="h-12 bg-gray-100 rounded-lg max-w-md animate-pulse" />
        </div>
      </section>

      {/* Category Filter Skeleton */}
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Skeleton */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="space-y-12 md:space-y-16">
            {/* Featured Post Skeleton (larger) */}
            <article className="group">
              <div className="flex gap-6 md:gap-12 flex-col md:flex-row">
                <div className="flex-1 min-w-0">
                  {/* Author & Date Skeleton */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <span className="text-gray-300">·</span>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  {/* Title Skeleton */}
                  <div className="h-10 md:h-12 bg-gray-200 rounded w-full mb-3 animate-pulse" />
                  <div className="h-10 md:h-12 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
                  {/* Excerpt Skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-2/3 animate-pulse" />
                  </div>
                  {/* Meta Skeleton */}
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-20 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
                {/* Featured Image Skeleton */}
                <div className="w-full md:w-[280px] lg:w-[360px] h-48 md:h-[200px] lg:h-[240px] bg-gray-200 rounded animate-pulse flex-shrink-0" />
              </div>
              <hr className="mt-12 md:mt-16 border-gray-200" />
            </article>

            {/* Regular Post Skeletons */}
            {[...Array(3)].map((_, index) => (
              <article key={index} className="group">
                <div className="flex gap-6 md:gap-12 flex-col sm:flex-row">
                  <div className="flex-1 min-w-0">
                    {/* Author & Date Skeleton */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        <span className="text-gray-300">·</span>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                    {/* Title Skeleton */}
                    <div className="h-7 md:h-8 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                    <div className="h-7 md:h-8 bg-gray-200 rounded w-2/3 mb-3 animate-pulse" />
                    {/* Excerpt Skeleton */}
                    <div className="space-y-2 mb-4">
                      <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                      <div className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
                    </div>
                    {/* Meta Skeleton */}
                    <div className="flex items-center gap-4">
                      <div className="h-6 w-16 bg-gray-100 rounded animate-pulse" />
                      <div className="h-4 w-14 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                  {/* Image Skeleton */}
                  <div className="w-full sm:w-[112px] md:w-[160px] h-32 sm:h-[112px] md:h-[160px] bg-gray-200 rounded animate-pulse flex-shrink-0" />
                </div>
                {index < 2 && <hr className="mt-12 md:mt-16 border-gray-200" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[728px] mx-auto px-6 text-center">
          <div className="h-10 md:h-12 bg-gray-200 rounded w-2/3 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-8 animate-pulse" />
          <div className="h-12 w-36 bg-gray-300 rounded-full mx-auto animate-pulse" />
        </div>
      </section>
    </>
  )
}