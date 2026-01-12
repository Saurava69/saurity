/**
 * Modern SEO Checker
 * Redesigned to reflect actual Google ranking factors, not SEO myths
 * Focus: Search intent, topical clarity, user experience signals
 */

import readingTime from 'reading-time';

// ========================================
// STOPWORDS & CONFIGURATION
// ========================================

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'you', 'your', 'how', 'what', 'when',
  'where', 'why', 'which', 'who', 'this', 'these', 'those', 'can',
  'could', 'should', 'would', 'may', 'might', 'must', 'shall'
]);

const FILLER_PHRASES = [
  'in this article', 'in this post', 'in this guide', 'we will',
  'we are going to', 'you will learn', 'let\'s explore', 'let\'s dive',
  'welcome to', 'today we', 'have you ever', 'are you looking'
];

const WEAK_ANCHORS = [
  'click here', 'read more', 'learn more', 'this', 'here',
  'link', 'this link', 'this article', 'this page'
];

const VAGUE_HEADINGS = [
  'overview', 'introduction', 'conclusion', 'summary',
  'details', 'information', 'about', 'more'
];

// ========================================
// KEYWORD EXTRACTION
// ========================================

/**
 * Extract meaningful 2-5 word keyword phrases from text
 */
function extractKeywordPhrases(text, title = '') {
  const words = text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));

  const phrases = new Map();
  
  // Extract 2-word phrases
  for (let i = 0; i < words.length - 1; i++) {
    const phrase = `${words[i]} ${words[i + 1]}`;
    phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
  }
  
  // Extract 3-word phrases
  for (let i = 0; i < words.length - 2; i++) {
    const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
  }
  
  // Extract 4-word phrases (less common but important)
  for (let i = 0; i < words.length - 3; i++) {
    const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]} ${words[i + 3]}`;
    if ((phrases.get(phrase) || 0) >= 1) {
      phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
    }
  }

  // Boost phrases that appear in title
  const titleLower = title.toLowerCase();
  for (const [phrase, count] of phrases.entries()) {
    if (titleLower.includes(phrase)) {
      phrases.set(phrase, count * 3);
    }
  }

  // Sort by frequency and filter
  return Array.from(phrases.entries())
    .filter(([phrase, count]) => count >= 2 || titleLower.includes(phrase))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([phrase, count]) => ({ phrase, count }));
}

/**
 * Determine primary and secondary keywords
 */
function identifyKeywords(title, content) {
  const allPhrases = extractKeywordPhrases(title + ' ' + content, title);
  
  const primary = allPhrases[0]?.phrase || null;
  const secondary = allPhrases.slice(1, 5).map(p => p.phrase);
  
  return { primary, secondary, allPhrases };
}

// ========================================
// SEARCH INTENT DETECTION
// ========================================

/**
 * Classify content intent based on title and structure
 */
function detectSearchIntent(title, content) {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Intent signals
  const informationalSignals = ['how to', 'what is', 'guide to', 'tutorial', 'learn', 'understand'];
  const commercialSignals = ['best', 'top', 'vs', 'versus', 'compare', 'comparison', 'review', 'alternative'];
  const transactionalSignals = ['buy', 'purchase', 'download', 'get', 'pricing', 'price', 'cost'];
  
  let intent = 'informational';
  let confidence = 0;
  
  // Check title for intent signals
  if (commercialSignals.some(s => titleLower.includes(s))) {
    intent = 'commercial';
    confidence = 0.8;
  } else if (transactionalSignals.some(s => titleLower.includes(s))) {
    intent = 'transactional';
    confidence = 0.9;
  } else if (informationalSignals.some(s => titleLower.includes(s))) {
    intent = 'informational';
    confidence = 0.7;
  }
  
  return { intent, confidence };
}

/**
 * Validate content structure matches detected intent
 */
function validateIntentMatch(intent, content, headings) {
  const issues = [];
  const contentLower = content.toLowerCase();
  
  switch (intent) {
    case 'informational':
      // Should have how-to steps or structured sections
      const hasSteps = /step \d+|first|second|third|finally|lastly/i.test(content);
      const hasList = content.match(/^[\*\-\d]+[\.\)]\s/gm)?.length >= 3;
      
      if (!hasSteps && !hasList) {
        issues.push('Informational content should include clear steps or structured lists');
      }
      break;
      
    case 'commercial':
      // Should have comparisons, pros/cons, features
      const hasComparison = /pros?:|cons?:|versus|compared to|better than/i.test(content);
      const hasTable = /\|.*\|.*\|/g.test(content);
      
      if (!hasComparison && !hasTable) {
        issues.push('Commercial content should include comparisons, pros/cons, or feature tables');
      }
      break;
      
    case 'transactional':
      // Should have clear CTAs, pricing info
      const hasCTA = /download|get started|sign up|try|free trial|pricing/i.test(content);
      
      if (!hasCTA) {
        issues.push('Transactional content should include clear calls-to-action');
      }
      break;
  }
  
  return issues;
}

// ========================================
// FIRST 100 WORDS ANALYSIS
// ========================================

/**
 * Check optimization of the first 100 words
 */
function analyzeFirstWords(content, primaryKeyword) {
  const issues = [];
  const warnings = [];
  
  const words = content.split(/\s+/);
  const first100 = words.slice(0, 100).join(' ').toLowerCase();
  
  // Check for primary keyword presence
  if (primaryKeyword && !first100.includes(primaryKeyword.toLowerCase())) {
    issues.push(`Primary keyword "${primaryKeyword}" not found in first 100 words`);
  }
  
  // Check for filler introduction
  const hasFillerIntro = FILLER_PHRASES.some(phrase => 
    first100.includes(phrase.toLowerCase())
  );
  
  if (hasFillerIntro) {
    warnings.push('Introduction contains filler phrases that delay topic clarity');
  }
  
  // Check if introduction is too vague
  const firstSentence = content.split(/[.!?]/)[0];
  if (firstSentence && firstSentence.split(/\s+/).length < 10) {
    warnings.push('First sentence is too short - may lack context');
  }
  
  return { issues, warnings };
}

// ========================================
// HEADING QUALITY ANALYSIS
// ========================================

/**
 * Extract and analyze heading structure
 */
function analyzeHeadings(content, primaryKeyword) {
  const issues = [];
  const warnings = [];
  const suggestions = [];
  
  const headings = extractHeadings(content);
  
  if (headings.length === 0) {
    issues.push('No headings found - content must have clear structure');
    return { issues, warnings, suggestions, headings };
  }
  
  // Check for single H1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    issues.push('Missing H1 heading');
  } else if (h1Count > 1) {
    issues.push(`Multiple H1 headings found (${h1Count}) - should have only one`);
  }
  
  // Check for skipped heading levels
  for (let i = 1; i < headings.length; i++) {
    const prevLevel = headings[i - 1].level;
    const currLevel = headings[i].level;
    
    if (currLevel > prevLevel + 1) {
      warnings.push(`Skipped heading level: H${prevLevel} → H${currLevel} (line ${headings[i].line})`);
    }
  }
  
  // Check for primary keyword in H2s
  const h2Headings = headings.filter(h => h.level === 2);
  const keywordInH2 = primaryKeyword && h2Headings.some(h => 
    h.text.toLowerCase().includes(primaryKeyword.toLowerCase())
  );
  
  if (h2Headings.length > 0 && primaryKeyword && !keywordInH2) {
    warnings.push('Primary keyword not found in any H2 heading');
  }
  
  // Check for vague headings
  const vague = headings.filter(h => 
    VAGUE_HEADINGS.some(v => h.text.toLowerCase().trim() === v)
  );
  
  if (vague.length > 0) {
    warnings.push(`Vague heading(s) detected: ${vague.map(h => `"${h.text}"`).join(', ')}`);
  }
  
  return { issues, warnings, suggestions, headings };
}

function extractHeadings(content) {
  const headings = [];
  
  // Check if content is HTML (contains HTML tags)
  const isHtml = /<[^>]+>/g.test(content);
  
  if (isHtml) {
    // Extract headings from HTML
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/gi;
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;
    const h4Regex = /<h4[^>]*>(.*?)<\/h4>/gi;
    const h5Regex = /<h5[^>]*>(.*?)<\/h5>/gi;
    const h6Regex = /<h6[^>]*>(.*?)<\/h6>/gi;
    
    let match;
    let lineCounter = 1;
    
    // Extract H1 headings
    while ((match = h1Regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      headings.push({ level: 1, text, line: lineCounter++ });
    }
    
    // Extract H2 headings
    while ((match = h2Regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      headings.push({ level: 2, text, line: lineCounter++ });
    }
    
    // Extract H3 headings
    while ((match = h3Regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      headings.push({ level: 3, text, line: lineCounter++ });
    }
    
    // Extract H4 headings
    while ((match = h4Regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      headings.push({ level: 4, text, line: lineCounter++ });
    }
    
    // Extract H5 headings
    while ((match = h5Regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      headings.push({ level: 5, text, line: lineCounter++ });
    }
    
    // Extract H6 headings
    while ((match = h6Regex.exec(content)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      headings.push({ level: 6, text, line: lineCounter++ });
    }
  } else {
    // Extract headings from markdown
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        
        headings.push({
          level,
          text,
          line: index + 1
        });
      }
    });
  }
  
  return headings;
}

// ========================================
// LINK EVALUATION
// ========================================

/**
 * Analyze internal and external links
 */
function analyzeLinks(content) {
  const issues = [];
  const warnings = [];
  const suggestions = [];
  
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      anchor: match[1],
      url: match[2]
    });
  }
  
  if (links.length === 0) {
    suggestions.push('No links found - consider adding contextual internal links');
    return { issues, warnings, suggestions, links };
  }
  
  // Classify links
  const internal = links.filter(l => !l.url.startsWith('http') || l.url.includes(process.env.NEXT_PUBLIC_SITE_URL || 'localhost'));
  const external = links.filter(l => l.url.startsWith('http') && !l.url.includes(process.env.NEXT_PUBLIC_SITE_URL || 'localhost'));
  
  // Check for at least one internal link
  if (internal.length === 0) {
    warnings.push('No internal links found - add contextual internal links');
  }
  
  // Check for poor anchor text
  const poorAnchors = links.filter(l => 
    WEAK_ANCHORS.some(weak => l.anchor.toLowerCase().trim() === weak)
  );
  
  if (poorAnchors.length > 0) {
    warnings.push(`Weak anchor text detected: ${poorAnchors.map(l => `"${l.anchor}"`).join(', ')}`);
  }
  
  // Warn about excessive external links
  if (external.length > 10) {
    warnings.push(`High number of external links (${external.length}) - ensure they add value`);
  }
  
  return { 
    issues, 
    warnings, 
    suggestions,
    stats: {
      total: links.length,
      internal: internal.length,
      external: external.length
    }
  };
}

// ========================================
// IMAGE SEO VALIDATION
// ========================================

/**
 * Validate image usage and alt text
 */
function analyzeImages(content, wordCount) {
  const issues = [];
  const warnings = [];
  const suggestions = [];
  
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      alt: match[1],
      url: match[2]
    });
  }
  
  // Check image-to-word ratio (~1 image per 300 words)
  const expectedImages = Math.max(1, Math.floor(wordCount / 300));
  
  if (images.length === 0) {
    warnings.push('No images found - add at least one relevant image');
  } else if (images.length < expectedImages) {
    suggestions.push(`Consider adding more images (current: ${images.length}, recommended: ~${expectedImages})`);
  }
  
  // Check alt text
  const missingAlt = images.filter(img => !img.alt || img.alt.trim().length === 0);
  const shortAlt = images.filter(img => img.alt && img.alt.length > 0 && img.alt.length < 10);
  const longAlt = images.filter(img => img.alt && img.alt.length > 125);
  
  if (missingAlt.length > 0) {
    warnings.push(`${missingAlt.length} image(s) missing alt text`);
  }
  
  if (shortAlt.length > 0) {
    warnings.push(`${shortAlt.length} image(s) have very short alt text (less than 10 chars)`);
  }
  
  if (longAlt.length > 0) {
    warnings.push(`${longAlt.length} image(s) have overly long alt text (over 125 chars)`);
  }
  
  return { 
    issues, 
    warnings, 
    suggestions,
    stats: {
      total: images.length,
      withAlt: images.filter(img => img.alt && img.alt.length > 0).length,
      missingAlt: missingAlt.length
    }
  };
}

// ========================================
// READABILITY SIGNALS
// ========================================

/**
 * Analyze readability metrics that matter
 */
function analyzeReadability(content) {
  const warnings = [];
  const suggestions = [];
  
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  // Average sentence length
  const totalWords = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0);
  const avgSentenceLength = totalWords / sentences.length;
  
  if (avgSentenceLength > 25) {
    warnings.push(`Long average sentence length (${Math.round(avgSentenceLength)} words) - aim for 15-20`);
  }
  
  // Check for walls of text (paragraphs > 150 words)
  const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 150);
  
  if (longParagraphs.length > 0) {
    warnings.push(`${longParagraphs.length} paragraph(s) exceed 150 words - break them up`);
  }
  
  // Basic passive voice detection
  const passiveIndicators = /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi;
  const passiveMatches = content.match(passiveIndicators) || [];
  const passiveRatio = passiveMatches.length / sentences.length;
  
  if (passiveRatio > 0.3) {
    suggestions.push('High passive voice usage detected - consider using more active voice');
  }
  
  return {
    warnings,
    suggestions,
    stats: {
      avgSentenceLength: Math.round(avgSentenceLength),
      paragraphCount: paragraphs.length,
      longParagraphs: longParagraphs.length
    }
  };
}

// ========================================
// TOPIC COVERAGE ANALYSIS
// ========================================

/**
 * Analyze topical depth and coverage
 */
function analyzeTopicCoverage(title, headings, primaryKeyword) {
  const warnings = [];
  const suggestions = [];
  
  // Extract key entities from title
  const titleWords = title.toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOPWORDS.has(w));
  
  // Check if main title concepts are covered in headings
  const headingText = headings.map(h => h.text.toLowerCase()).join(' ');
  
  const uncoveredTopics = titleWords.filter(word => {
    return !headingText.includes(word) && 
           word !== primaryKeyword?.toLowerCase().split(' ')[0];
  });
  
  if (uncoveredTopics.length > 0) {
    suggestions.push(`Consider adding sections covering: ${uncoveredTopics.join(', ')}`);
  }
  
  // Check for depth (H3+ headings)
  const deepHeadings = headings.filter(h => h.level >= 3);
  
  if (headings.length > 3 && deepHeadings.length === 0) {
    suggestions.push('Content lacks depth - consider adding H3 subheadings for detailed coverage');
  }
  
  return { warnings, suggestions };
}

// ========================================
// SCORING SYSTEM
// ========================================

/**
 * Calculate weighted scores across categories
 */
function calculateScores(results) {
  const scores = {
    contentQuality: 100,
    structure: 100,
    intentMatch: 100,
    technicalSEO: 100
  };
  
  // Content Quality (30% weight)
  if (results.wordCount < 300) scores.contentQuality -= 40;
  else if (results.wordCount < 600) scores.contentQuality -= 20;
  else if (results.wordCount < 800) scores.contentQuality -= 10;
  
  scores.contentQuality -= results.firstWords.issues.length * 10;
  scores.contentQuality -= results.firstWords.warnings.length * 5;
  scores.contentQuality -= results.readability.warnings.length * 5;
  
  // Structure (25% weight)
  scores.structure -= results.headingAnalysis.issues.length * 15;
  scores.structure -= results.headingAnalysis.warnings.length * 8;
  scores.structure -= results.topicCoverage.warnings.length * 5;
  
  // Intent Match (25% weight)
  if (results.intent.confidence < 0.5) scores.intentMatch -= 20;
  scores.intentMatch -= results.intentMatch.length * 15;
  
  // Technical SEO (20% weight)
  scores.technicalSEO -= results.linkAnalysis.issues.length * 10;
  scores.technicalSEO -= results.linkAnalysis.warnings.length * 5;
  scores.technicalSEO -= results.imageAnalysis.warnings.length * 5;
  
  // Normalize scores to 0-100
  Object.keys(scores).forEach(key => {
    scores[key] = Math.max(0, Math.min(100, scores[key]));
  });
  
  // Calculate weighted overall score
  const overall = Math.round(
    scores.contentQuality * 0.30 +
    scores.structure * 0.25 +
    scores.intentMatch * 0.25 +
    scores.technicalSEO * 0.20
  );
  
  return { ...scores, overall };
}

// ========================================
// MAIN SEO CHECKER FUNCTION
// ========================================

/**
 * Comprehensive SEO analysis
 * @param {string} title - Article title
 * @param {string} excerpt - Meta description
 * @param {string} content - Article content (markdown)
 * @param {string} slug - URL slug
 * @returns {object} Complete SEO analysis results
 */
export function checkSEO(title, excerpt, content, slug) {
  const issues = [];
  const warnings = [];
  const suggestions = [];
  
  // Basic validation
  if (!title) {
    issues.push('Title is required');
    return buildErrorResponse(issues);
  }
  
  if (!content) {
    issues.push('Content is required');
    return buildErrorResponse(issues);
  }
  
  // Calculate basic metrics
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  const readabilityStats = readingTime(content);
  
  // Extract keywords
  const { primary, secondary } = identifyKeywords(title, content);
  
  // Detect search intent
  const intent = detectSearchIntent(title, content);
  
  // Analyze first 100 words
  const firstWords = analyzeFirstWords(content, primary);
  issues.push(...firstWords.issues);
  warnings.push(...firstWords.warnings);
  
  // Analyze headings
  const headingAnalysis = analyzeHeadings(content, primary);
  issues.push(...headingAnalysis.issues);
  warnings.push(...headingAnalysis.warnings);
  suggestions.push(...headingAnalysis.suggestions);
  
  // Validate intent match
  const intentMatch = validateIntentMatch(intent.intent, content, headingAnalysis.headings);
  warnings.push(...intentMatch);
  
  // Analyze links
  const linkAnalysis = analyzeLinks(content);
  issues.push(...linkAnalysis.issues);
  warnings.push(...linkAnalysis.warnings);
  suggestions.push(...linkAnalysis.suggestions);
  
  // Analyze images
  const imageAnalysis = analyzeImages(content, wordCount);
  issues.push(...imageAnalysis.issues);
  warnings.push(...imageAnalysis.warnings);
  suggestions.push(...imageAnalysis.suggestions);
  
  // Analyze readability
  const readability = analyzeReadability(content);
  warnings.push(...readability.warnings);
  suggestions.push(...readability.suggestions);
  
  // Analyze topic coverage
  const topicCoverage = analyzeTopicCoverage(title, headingAnalysis.headings, primary);
  warnings.push(...topicCoverage.warnings);
  suggestions.push(...topicCoverage.suggestions);
  
  // Title optimization
  if (title.length < 30) {
    warnings.push('Title is too short (recommended: 30-60 characters)');
  } else if (title.length > 60) {
    warnings.push('Title is too long (recommended: 30-60 characters)');
  }
  
  // Excerpt/Meta description
  if (!excerpt) {
    issues.push('Meta description is required');
  } else {
    if (excerpt.length < 120) {
      warnings.push('Meta description is too short (recommended: 120-160 characters)');
    } else if (excerpt.length > 160) {
      warnings.push('Meta description is too long (recommended: 120-160 characters)');
    }
  }
  
  // Slug validation
  if (!slug) {
    issues.push('URL slug is required');
  } else {
    if (slug.length > 75) {
      warnings.push('URL slug is too long (recommended: under 75 characters)');
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      warnings.push('URL slug should only contain lowercase letters, numbers, and hyphens');
    }
  }
  
  // Calculate scores
  const scores = calculateScores({
    wordCount,
    firstWords,
    headingAnalysis,
    intent,
    intentMatch,
    linkAnalysis,
    imageAnalysis,
    readability,
    topicCoverage
  });
  
  return {
    score: scores,
    issues,
    warnings,
    suggestions,
    intent: intent.intent,
    intentConfidence: intent.confidence,
    primaryKeyword: primary,
    secondaryKeywords: secondary,
    metrics: {
      wordCount,
      readingTime: readabilityStats,
      headingCount: headingAnalysis.headings.length,
      linkCount: linkAnalysis.stats,
      imageCount: imageAnalysis.stats,
      readability: readability.stats
    },
    grade: getGrade(scores.overall)
  };
}

function buildErrorResponse(issues) {
  return {
    score: {
      contentQuality: 0,
      structure: 0,
      intentMatch: 0,
      technicalSEO: 0,
      overall: 0
    },
    issues,
    warnings: [],
    suggestions: [],
    intent: null,
    intentConfidence: 0,
    primaryKeyword: null,
    secondaryKeywords: [],
    metrics: null,
    grade: 'F'
  };
}

function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

// ========================================
// UTILITY EXPORTS
// ========================================

export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export { extractHeadings };
