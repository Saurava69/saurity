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
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
