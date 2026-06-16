'use client';

// React imported implicitly via jsx-runtime

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export interface PricingPlan {
  name: string;
  price: number | string;
  interval?: string;
  description?: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  /** Highlight this plan as featured / recommended */
  highlighted?: boolean;
}

export interface PricingProps {
  /** Array of pricing plans */
  plans: PricingPlan[];
  /** Billing interval label (e.g. 'monthly', 'yearly') */
  interval?: 'monthly' | 'yearly';
}

export function Pricing({ plans }: PricingProps) {
  if (!plans || plans.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 ${
            plans.length === 1
              ? 'max-w-md mx-auto'
              : plans.length === 2
                ? 'md:grid-cols-2 max-w-3xl mx-auto'
                : 'md:grid-cols-3'
          }`}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 border transition-shadow duration-300 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }`}
            >
              {/* Highlight badge */}
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white text-blue-600 shadow">
                  Popular
                </span>
              )}

              {/* Plan name */}
              <h3
                className={`text-xl font-bold ${
                  plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}
              >
                {plan.name}
              </h3>

              {/* Description */}
              {plan.description && (
                <p
                  className={`mt-2 text-sm ${
                    plan.highlighted
                      ? 'text-blue-100'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {plan.description}
                </p>
              )}

              {/* Price */}
              <div className="mt-6 mb-8">
                <span
                  className={`text-5xl font-extrabold tracking-tight ${
                    plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {typeof plan.price === 'number'
                    ? `$${plan.price}`
                    : plan.price}
                </span>
                {plan.interval && (
                  <span
                    className={`text-sm font-medium ${
                      plan.highlighted
                        ? 'text-blue-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    /{plan.interval}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? 'text-blue-200'
                          : 'text-blue-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={
                        plan.highlighted
                          ? 'text-blue-100'
                          : 'text-gray-600 dark:text-gray-300'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.cta.href}
                className={`block w-full text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100 shadow'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
              >
                {plan.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
