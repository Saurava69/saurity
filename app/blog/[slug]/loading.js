/**
 * Individual blog post loading skeleton
 * Shows while the blog post data is being fetched
 */
export default function BlogPostLoading() {
  return (
    <article className="min-h-screen bg-white">
      {/* Reading Progress Bar Placeholder */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50" />

      {/* Article Header Skeleton */}
      <header className="pt-8 pb-12 md:pt-12 md:pb-16 bg-white">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="max-w-[728px] mx-auto">
            {/* Category Badge Skeleton */}
            <div className="h-6 w-24 bg-gray-200 rounded-full mb-6 animate-pulse" />
            
            {/* Title Skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-10 md:h-14 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-10 md:h-14 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-10 md:h-14 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
            
            {/* Excerpt Skeleton */}
            <div className="space-y-2 mb-8">
              <div className="h-6 bg-gray-100 rounded w-full animate-pulse" />
              <div className="h-6 bg-gray-100 rounded w-4/5 animate-pulse" />
            </div>

            {/* Author Info Skeleton */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                  <span className="text-gray-300">·</span>
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image Skeleton */}
          <div className="mt-8 max-w-[900px] mx-auto">
            <div className="aspect-[16/9] bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Content Grid Skeleton */}
      <div className="max-w-[1192px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr_256px] gap-8 relative">
          {/* Left Sidebar Skeleton */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Author Card Skeleton */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 animate-pulse" />
                <div className="h-5 w-24 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                <div className="h-4 w-32 bg-gray-100 rounded mx-auto animate-pulse" />
              </div>
              
              {/* Stats Skeleton */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Share Buttons Skeleton */}
              <div className="flex justify-center gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="min-w-0 py-8">
            <div className="prose prose-lg max-w-none">
              {/* Paragraph Skeletons */}
              {[...Array(4)].map((_, blockIndex) => (
                <div key={blockIndex} className="mb-8">
                  {/* Heading Skeleton (sometimes) */}
                  {blockIndex === 0 || blockIndex === 2 ? (
                    <div className="h-8 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
                  ) : null}
                  
                  {/* Paragraph Lines */}
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-11/12 animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-4/5 animate-pulse" />
                    {blockIndex % 2 === 0 && (
                      <>
                        <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                        <div className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Code Block Skeleton */}
              <div className="my-8 p-6 bg-gray-900 rounded-lg">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse" />
                </div>
              </div>

              {/* More Paragraphs */}
              {[...Array(2)].map((_, blockIndex) => (
                <div key={`second-${blockIndex}`} className="mb-8">
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Table of Contents Skeleton */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-4 bg-gray-200 rounded animate-pulse" 
                      style={{ width: `${70 + Math.random() * 30}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Footer Skeleton */}
      <footer className="border-t border-gray-200 mt-16 pt-12 pb-16 bg-gray-50">
        <div className="max-w-[728px] mx-auto px-6">
          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>

          {/* Related Posts Skeleton */}
          <div className="h-8 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </article>
  )
}