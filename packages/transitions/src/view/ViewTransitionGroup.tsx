'use client';

import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { supportsViewTransitions } from './ViewTransition';

export interface ViewTransitionGroupProps {
  children: ReactNode;
  /**
   * Prefix for view-transition-name values.
   * Each child will get `prefix-{index}` as its transition name.
   * Elements with matching prefixes across navigations animate between states.
   *
   * @example
   *   <ViewTransitionGroup name="card">
   *     <div>Card 1</div>
   *     <div>Card 2</div>
   *   </ViewTransitionGroup>
   *   // Generates: view-transition-name: card-0, card-1
   */
  name: string;
  /**
   * Custom transition names per child (overrides auto-indexing).
   * Array must match children length or be omitted for auto-indexing.
   *
   * @example
   *   <ViewTransitionGroup name="gallery" names={['hero', 'thumb-1', 'thumb-2']}>
   *     <img ... />
   *     <img ... />
   *     <img ... />
   *   </ViewTransitionGroup>
   */
  names?: string[];
  /** Additional CSS class names applied to the wrapper div. */
  className?: string;
  /** HTML tag for the wrapper element. */
  as?: keyof HTMLElementTagNameMap;
}

declare global {
  interface CSSStyleDeclaration {
    viewTransitionName?: string;
  }
  interface HTMLElement {
    style: CSSStyleDeclaration & {
      viewTransitionName?: string;
    };
  }
}

/**
 * ViewTransitionGroup — Multiple element transitions via the View Transitions API.
 *
 * Wraps multiple children, assigning each a unique `view-transition-name`
 * so the browser animates all of them simultaneously across page navigations.
 *
 * Falls back to static rendering if the API is unsupported.
 *
 * Usage:
 *   <ViewTransitionGroup name="product-card" names={['image', 'title', 'price']}>
 *     <img src="/product.jpg" />
 *     <h2>Product Name</h2>
 *     <span>$99</span>
 *   </ViewTransitionGroup>
 */
export function ViewTransitionGroup({
  children,
  name,
  names,
  className,
  as: Tag = 'div',
}: ViewTransitionGroupProps) {
  const isSupported = supportsViewTransitions();
  const childrenArray = Children.toArray(children);
  const transitionNames = names ?? childrenArray.map((_, i) => `${name}-${i}`);

  return (
    <Tag className={className} data-vt-group={name}>
      {childrenArray.map((child, i) => {
        const vtName = transitionNames[i] ?? `${name}-${i}`;

        if (!isSupported || !isValidElement(child)) {
          return child;
        }

        return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {
            ...((child as React.ReactElement<{ style?: React.CSSProperties }>).props.style ?? {}),
            viewTransitionName: vtName,
            contain: 'layout',
          } as React.CSSProperties,
        });
      })}
    </Tag>
  );
}
