'use client';

import { useState, useCallback, type FormEvent } from 'react';

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

export interface NewsletterProps {
  /** Called with the email when the form is submitted */
  onSubmit: (email: string) => void | Promise<void>;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Submit button text */
  buttonText?: string;
  /** Layout variant */
  variant?: 'inline' | 'stacked';
}

export function Newsletter({
  onSubmit,
  title = 'Stay in the loop',
  description = 'Get the latest updates delivered to your inbox.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  variant = 'inline',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError('');

      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      setLoading(true);
      try {
        await onSubmit(email);
        setSuccess(true);
        setEmail('');
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [email, onSubmit],
  );

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mx-auto ${
            variant === 'stacked' ? 'text-center' : ''
          }`}
        >
          {/* Title & Description */}
          {title && (
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}

          {/* Form */}
          {!success ? (
            <form
              onSubmit={handleSubmit}
              className={`mt-8 ${
                variant === 'inline'
                  ? 'flex flex-col sm:flex-row gap-3'
                  : 'flex flex-col gap-3'
              }`}
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none shadow-sm transition-all duration-200"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : null}
                {buttonText}
              </button>
            </form>
          ) : (
            <div className="mt-8 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm font-medium text-center">
              ✓ Thanks for subscribing! Check your inbox for a confirmation
              email.
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
