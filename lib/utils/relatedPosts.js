// Related Posts Engine
export function findRelatedPosts(currentPost, allPosts, limit = 3) {
  if (!currentPost || !allPosts || allPosts.length === 0) {
    return [];
  }

  // Score each post based on similarity
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentPost.slug && post.status === 'published')
    .map(post => ({
      ...post,
      score: calculateSimilarityScore(currentPost, post)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scoredPosts;
}

function calculateSimilarityScore(post1, post2) {
  let score = 0;

  // Same category: +50 points
  if (post1.category === post2.category) {
    score += 50;
  }

  // Shared tags: +10 points per tag
  const tags1 = post1.tags || [];
  const tags2 = post2.tags || [];
  const sharedTags = tags1.filter(tag => tags2.includes(tag));
  score += sharedTags.length * 10;

  // Similar titles (word matching): +5 points per word
  const title1Words = post1.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const title2Words = post2.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const sharedWords = title1Words.filter(word => title2Words.includes(word));
  score += sharedWords.length * 5;

  // Recent posts get a small boost (within 30 days): +10 points
  const daysDiff = Math.abs(
    (new Date(post1.publishedDate) - new Date(post2.publishedDate)) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff <= 30) {
    score += 10;
  }

  // Similar excerpt content: +3 points per matched word
  if (post1.excerpt && post2.excerpt) {
    const excerpt1Words = post1.excerpt.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const excerpt2Words = post2.excerpt.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const sharedExcerptWords = excerpt1Words.filter(word => excerpt2Words.includes(word));
    score += sharedExcerptWords.length * 3;
  }

  return score;
}

export function searchPosts(query, posts) {
  if (!query || query.trim().length === 0) {
    return posts;
  }

  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  
  return posts
    .filter(post => post.status === 'published')
    .map(post => ({
      ...post,
      searchScore: calculateSearchScore(post, searchTerms)
    }))
    .filter(post => post.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
}

function calculateSearchScore(post, searchTerms) {
  let score = 0;
  
  const title = post.title.toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  const content = (post.content || '').toLowerCase();
  const tags = (post.tags || []).map(tag => tag.toLowerCase());
  const category = post.category.toLowerCase();

  searchTerms.forEach(term => {
    // Title matches: +100 points (most important)
    if (title.includes(term)) {
      score += 100;
      // Exact word match in title: bonus +50 points
      const titleWords = title.split(/\s+/);
      if (titleWords.includes(term)) {
        score += 50;
      }
    }

    // Tag matches: +80 points
    if (tags.some(tag => tag.includes(term))) {
      score += 80;
    }

    // Category match: +70 points
    if (category.includes(term)) {
      score += 70;
    }

    // Excerpt matches: +50 points
    if (excerpt.includes(term)) {
      score += 50;
    }

    // Content matches: +10 points (less important, but still relevant)
    if (content.includes(term)) {
      score += 10;
    }
  });

  return score;
}

export function getPopularTags(posts, limit = 10) {
  const tagCount = {};

  posts
    .filter(post => post.status === 'published')
    .forEach(post => {
      (post.tags || []).forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });

  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}

export function getCategoryCounts(posts) {
  const categoryCount = {};

  posts
    .filter(post => post.status === 'published')
    .forEach(post => {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    });

  return categoryCount;
}

export function filterPostsByCategory(posts, category) {
  if (!category) return posts;
  return posts.filter(post => post.category === category && post.status === 'published');
}

export function filterPostsByTag(posts, tag) {
  if (!tag) return posts;
  return posts.filter(post => 
    post.status === 'published' && 
    (post.tags || []).includes(tag)
  );
}
