import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts, extractTextFromTiptap, calculateReadTime } from '@/lib/firebase/posts'
import ArticleHeader from '@/components/blog/ArticleHeader'
import ArticleContent from '@/components/blog/ArticleContent'
import ArticleFooter from '@/components/blog/ArticleFooter'
import ReadingProgress from '@/components/blog/ReadingProgress'
import TableOfContents from '@/components/blog/TableOfContents'

/**
 * Generate metadata for SEO (Server-side)
 */
export async function generateMetadata({ params }) {
  // Await params in Next.js 15+
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams?.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const publishDate = new Date(post.publishedAt || post.createdAt)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://www.saurity.com/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://www.saurity.com/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImage || 'https://www.saurity.com/HomePage1200_600.webp',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      siteName: 'Saurity',
      publishedTime: publishDate.toISOString(),
      modifiedTime: (post.updatedAt || post.publishedAt || post.createdAt),
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage || 'https://www.saurity.com/HomePage1200_600.webp'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/**
 * Enable ISR (Incremental Static Regeneration)
 * Regenerate page every hour
 */
export const revalidate = 3600

/**
 * Blog post page - Server Component
 */
export default async function BlogPostPage({ params }) {
  // Await params in Next.js 15+
  const resolvedParams = await params
  
  // Validate slug
  if (!resolvedParams?.slug) {
    notFound()
  }
  
  // Fetch post data server-side
  const post = await getPostBySlug(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  // Calculate accurate reading time
  post.readTime = calculateReadTime(post.content)

  // Fetch related posts
  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3)

  // Generate JSON-LD structured data
  const publishDate = new Date(post.publishedAt || post.createdAt)
  const articleText = extractTextFromTiptap(post.content)
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://www.saurity.com/blog/${post.slug}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.saurity.com/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: post.featuredImage || 'https://www.saurity.com/logo.png',
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saurity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.saurity.com/logo.png',
        width: 600,
        height: 60,
      },
    },
    datePublished: publishDate.toISOString(),
    dateModified: (post.updatedAt || post.publishedAt || post.createdAt),
    articleBody: articleText,
    wordCount: articleText.split(/\s+/).length,
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    inLanguage: 'en-US',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.saurity.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://www.saurity.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://www.saurity.com/blog/${post.slug}`,
        },
      ],
    },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Article Content */}
      <article className="min-h-screen bg-white">
        <ArticleHeader post={post} />
        
        {/* Main Content with Sidebar */}
        <div className="relative">
          <ArticleContent content={post.content} />
          
          {/* Table of Contents - Hidden on mobile, sidebar on desktop */}
          <aside className="hidden lg:block fixed right-8 top-1/4 w-64">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        <ArticleFooter post={post} relatedPosts={relatedPosts} />
      </article>
    </>
  )
}
