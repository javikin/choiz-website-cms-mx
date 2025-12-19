/**
 * Reviews Component
 *
 * Displays product reviews with three variants:
 * - compact: Simple star rating display
 * - stats: Big rating number with star breakdown
 * - detailed: Full reviews with individual cards
 *
 * Usage:
 * <Reviews
 *   headline="Lo que dicen nuestros clientes"
 *   averageRating={4.8}
 *   totalReviews={1247}
 *   variant="detailed"
 *   reviews={[...]}
 *   breakdown={[...]}
 * />
 */

import React from 'react';
import styles from './Reviews.module.css';

interface Review {
  name: string;
  date?: string;
  rating: number;
  text?: string;
  productName?: string;
}

interface StarBreakdown {
  stars: number;
  percentage: number;
}

interface ReviewsProps {
  headline?: string;
  averageRating?: number;
  totalReviews?: number;
  breakdown?: StarBreakdown[];
  reviews?: Review[];
  variant?: 'compact' | 'detailed' | 'stats';
  tinaField?: string;
}

const StarIcon: React.FC<{ filled?: boolean; half?: boolean }> = ({ filled = false, half = false }) => {
  if (half) {
    return (
      <svg className={`${styles.star} ${styles.halfFilled}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  return (
    <svg className={`${styles.star} ${filled ? styles.filled : ''}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<StarIcon key={i} filled />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<StarIcon key={i} half />);
    } else {
      stars.push(<StarIcon key={i} />);
    }
  }

  return <div className={`${styles.stars} ${className || ''}`}>{stars}</div>;
};

const CompactVariant: React.FC<{
  averageRating: number;
  totalReviews: number;
}> = ({ averageRating, totalReviews }) => {
  return (
    <div className={styles.compactContainer}>
      <div className={styles.ratingDisplay}>
        <span className={styles.averageRating}>{averageRating.toFixed(1)}</span>
        <StarRating rating={averageRating} />
      </div>
      <p className={styles.totalReviews}>
        Basado en {totalReviews.toLocaleString('es-MX')} reseñas verificadas
      </p>
    </div>
  );
};

const StatsVariant: React.FC<{
  averageRating: number;
  totalReviews: number;
  breakdown: StarBreakdown[];
}> = ({ averageRating, totalReviews, breakdown }) => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsLeft}>
        <div className={styles.statsBigNumber}>
          {averageRating.toFixed(1)}
          <span className={styles.statsOutOf}>/5</span>
        </div>
        <StarRating rating={averageRating} className={styles.statsStars} />
        <p className={styles.statsTotal}>
          {totalReviews.toLocaleString('es-MX')} reseñas
        </p>
      </div>

      <div className={styles.breakdown}>
        {breakdown
          .sort((a, b) => b.stars - a.stars)
          .map((item) => (
            <div key={item.stars} className={styles.breakdownItem}>
              <div className={styles.breakdownStars}>
                {item.stars} {item.stars === 1 ? 'estrella' : 'estrellas'}
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className={styles.breakdownPercentage}>
                {item.percentage}%
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const DetailedVariant: React.FC<{
  averageRating: number;
  totalReviews: number;
  breakdown: StarBreakdown[];
  reviews: Review[];
}> = ({ averageRating, totalReviews, breakdown, reviews }) => {
  return (
    <div className={styles.detailedContainer}>
      <div className={styles.detailedHeader}>
        <div className={styles.detailedSummary}>
          <div className={styles.ratingDisplay}>
            <span className={styles.averageRating}>{averageRating.toFixed(1)}</span>
            <StarRating rating={averageRating} />
          </div>
          <p className={styles.totalReviews}>
            {totalReviews.toLocaleString('es-MX')} reseñas verificadas
          </p>
        </div>

        <div className={styles.breakdown}>
          {breakdown
            .sort((a, b) => b.stars - a.stars)
            .map((item) => (
              <div key={item.stars} className={styles.breakdownItem}>
                <div className={styles.breakdownStars}>
                  <StarRating rating={item.stars} />
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className={styles.breakdownPercentage}>
                  {item.percentage}%
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerInfo}>
                <div className={styles.reviewerName}>{review.name}</div>
                {review.date && (
                  <div className={styles.reviewDate}>{review.date}</div>
                )}
              </div>
              <StarRating rating={review.rating} className={styles.reviewStars} />
            </div>
            {review.productName && (
              <div className={styles.reviewProduct}>
                Producto: {review.productName}
              </div>
            )}
            {review.text && (
              <p className={styles.reviewText}>{review.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Reviews: React.FC<ReviewsProps> = ({
  headline = 'Reseñas de Clientes',
  averageRating = 4.8,
  totalReviews = 0,
  breakdown = [
    { stars: 5, percentage: 89 },
    { stars: 4, percentage: 8 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ],
  reviews = [],
  variant = 'compact',
  tinaField,
}) => {
  return (
    <section className={styles.reviewsSection} data-tina-field={tinaField}>
      <div className={styles.container}>
        <h2 className={styles.headline}>{headline}</h2>

        {variant === 'compact' && (
          <CompactVariant
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        )}

        {variant === 'stats' && (
          <StatsVariant
            averageRating={averageRating}
            totalReviews={totalReviews}
            breakdown={breakdown}
          />
        )}

        {variant === 'detailed' && (
          <DetailedVariant
            averageRating={averageRating}
            totalReviews={totalReviews}
            breakdown={breakdown}
            reviews={reviews}
          />
        )}
      </div>
    </section>
  );
};

export default Reviews;
