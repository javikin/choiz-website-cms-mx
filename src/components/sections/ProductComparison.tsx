import React from 'react';
import styles from './ProductComparison.module.css';

/**
 * ProductComparison Component
 *
 * Usage example:
 *
 * <ProductComparison
 *   headline="Elige el plan perfecto para ti"
 *   variant="table"
 *   products={[
 *     { name: 'Básico', price: '$499', ctaText: 'Empezar', ctaLink: '#' },
 *     { name: 'Pro', price: '$799', ctaText: 'Empezar', ctaLink: '#', isRecommended: true },
 *     { name: 'Premium', price: '$999', ctaText: 'Empezar', ctaLink: '#' }
 *   ]}
 *   features={[
 *     { name: 'Consulta personalizada', included: [true, true, true] },
 *     { name: 'Fórmula customizada', included: [false, true, true] },
 *     { name: 'Seguimiento mensual', included: [false, false, true] }
 *   ]}
 * />
 *
 * Accessibility:
 * - Semantic table markup for screen readers
 * - ARIA labels on CTAs
 * - Keyboard navigation support
 * - High contrast checkmarks/X marks
 *
 * Performance:
 * - CSS Modules for scoped styles
 * - No external dependencies
 * - Optimized for mobile (horizontal scroll or stack)
 */

interface Feature {
  name: string;
  included: boolean[];  // Array matching products
}

interface Product {
  name: string;
  price?: string;
  priceNote?: string;
  ctaText?: string;
  ctaLink?: string;
  isRecommended?: boolean;
}

interface ProductComparisonProps {
  headline?: string;
  products?: Product[];
  features?: Feature[];
  variant?: 'table' | 'cards';
  tinaField?: string;
}

const CheckIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  headline = 'Compara nuestros planes',
  products = [],
  features = [],
  variant = 'table',
  tinaField,
}) => {
  // Default products if none provided
  const defaultProducts: Product[] = [
    {
      name: 'Básico',
      price: '$499',
      priceNote: '/mes',
      ctaText: 'Empezar ahora',
      ctaLink: '#',
      isRecommended: false,
    },
    {
      name: 'Pro',
      price: '$799',
      priceNote: '/mes',
      ctaText: 'Empezar ahora',
      ctaLink: '#',
      isRecommended: true,
    },
    {
      name: 'Premium',
      price: '$999',
      priceNote: '/mes',
      ctaText: 'Empezar ahora',
      ctaLink: '#',
      isRecommended: false,
    },
  ];

  // Default features if none provided
  const defaultFeatures: Feature[] = [
    { name: 'Consulta personalizada', included: [true, true, true] },
    { name: 'Fórmula customizada', included: [false, true, true] },
    { name: 'Seguimiento mensual', included: [false, true, true] },
    { name: 'Soporte prioritario', included: [false, false, true] },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;
  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  // Validate that feature included arrays match product count
  const validatedFeatures = displayFeatures.map(feature => ({
    ...feature,
    included: feature.included.slice(0, displayProducts.length),
  }));

  if (variant === 'cards') {
    return (
      <section className={styles.section} data-tina-field={tinaField}>
        <div className={styles.container}>
          {headline && <h2 className={styles.headline}>{headline}</h2>}

          <div className={styles.cardsGrid}>
            {displayProducts.map((product, index) => (
              <div
                key={index}
                className={`${styles.card} ${product.isRecommended ? styles.recommended : ''}`}
              >
                {product.isRecommended && (
                  <div className={styles.badge}>Recomendado</div>
                )}

                <div className={styles.cardHeader}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  {product.price && (
                    <div className={styles.priceWrapper}>
                      <span className={styles.price}>{product.price}</span>
                      {product.priceNote && (
                        <span className={styles.priceNote}>{product.priceNote}</span>
                      )}
                    </div>
                  )}
                </div>

                <ul className={styles.featureList}>
                  {validatedFeatures.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={styles.featureItem}
                    >
                      <span className={`${styles.icon} ${feature.included[index] ? styles.iconCheck : styles.iconX}`}>
                        {feature.included[index] ? <CheckIcon /> : <XIcon />}
                      </span>
                      <span className={styles.featureName}>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                {product.ctaText && (
                  <a
                    href={product.ctaLink || '#'}
                    className={`${styles.cta} ${product.isRecommended ? styles.ctaPrimary : styles.ctaSecondary}`}
                    aria-label={`${product.ctaText} - ${product.name}`}
                  >
                    {product.ctaText}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Table variant
  return (
    <section className={styles.section} data-tina-field={tinaField}>
      <div className={styles.container}>
        {headline && <h2 className={styles.headline}>{headline}</h2>}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.featureColumn}>
                  <span className="sr-only">Características</span>
                </th>
                {displayProducts.map((product, index) => (
                  <th key={index} className={styles.productColumn}>
                    <div className={styles.productHeader}>
                      {product.isRecommended && (
                        <div className={styles.badge}>Recomendado</div>
                      )}
                      <h3 className={styles.productName}>{product.name}</h3>
                      {product.price && (
                        <div className={styles.priceWrapper}>
                          <span className={styles.price}>{product.price}</span>
                          {product.priceNote && (
                            <span className={styles.priceNote}>{product.priceNote}</span>
                          )}
                        </div>
                      )}
                      {product.ctaText && (
                        <a
                          href={product.ctaLink || '#'}
                          className={`${styles.cta} ${product.isRecommended ? styles.ctaPrimary : styles.ctaSecondary}`}
                          aria-label={`${product.ctaText} - ${product.name}`}
                        >
                          {product.ctaText}
                        </a>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {validatedFeatures.map((feature, featureIndex) => (
                <tr key={featureIndex}>
                  <td className={styles.featureCell}>{feature.name}</td>
                  {feature.included.map((included, productIndex) => (
                    <td key={productIndex} className={styles.checkCell}>
                      <span className={`${styles.icon} ${included ? styles.iconCheck : styles.iconX}`}>
                        {included ? (
                          <>
                            <CheckIcon />
                            <span className="sr-only">Incluido</span>
                          </>
                        ) : (
                          <>
                            <XIcon />
                            <span className="sr-only">No incluido</span>
                          </>
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
