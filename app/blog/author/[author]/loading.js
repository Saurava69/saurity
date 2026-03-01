/**
 * Author page loading skeleton
 * Shows while the author's posts are being fetched
 */
export default function AuthorLoading() {
  return (
    <>
      {/* Author Header Skeleton */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="max-w-[728px] mx-auto">
            {/* Back to blog link skeleton */}
            <div className="h-5 w-28 bg-gray-200 rounded mb-6 animate-pulse" />

            {/* Author Avatar Skeleton */}
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-6 animate-pulse" />

            {/* Author Name Skeleton */}
            <div className="h-12 md:h-14 bg-gray-200 rounded w-48 mb-3 animate-pulse" />

            {/* Post Count Skeleton */}
            <div className="h-6 bg-gray-100 rounded w-36 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Posts Section Skeleton */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="space-y-12 md:space-y-16">
            {/* Post Skeletons */}
            {[...Array(4)].map((_, index) => (
              <article key={index} className="group">
                <div className="flex gap-6 md:gap-12 flex-col sm:flex-row">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Date Skeleton */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
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

                {/* Divider */}
                {index < 3 && <hr className="mt-12 md:mt-16 border-gray-200" />}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}