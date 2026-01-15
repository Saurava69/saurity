'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const categories = [
  'All',
  'Security Tips',
  'Vulnerabilities',
  'Tutorials',
  'News & Updates',
  'Best Practices',
  'Case Studies',
  'WordPress Security',
  'Plugin Security',
  'Web Application Security'
]

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (category) => {
    const categoryParam = category === 'All' ? 'all' : category
    if (categoryParam === 'all') {
      router.push('/blog')
    } else {
      router.push(`/blog?category=${encodeURIComponent(categoryParam)}`)
    }
  }

  return (
    <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-[1192px] mx-auto px-6">
        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => {
            const isSelected = selectedCategory === (category === 'All' ? 'all' : category)
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-sm font-normal whitespace-nowrap pb-3 border-b transition-colors relative ${
                  isSelected
                    ? 'text-gray-900 border-gray-900 font-medium'
                    : 'text-gray-500 border-transparent hover:text-gray-900'
                }`}
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
                }}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
