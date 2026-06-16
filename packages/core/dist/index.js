'use strict';

var React4 = require('react');
var jsxRuntime = require('react/jsx-runtime');
var framerMotion = require('framer-motion');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React4__default = /*#__PURE__*/_interopDefault(React4);

// src/components/Button.tsx
var variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
  ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md",
  link: "text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 dark:text-blue-400"
};
var sizeStyles = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
  xl: "px-6 py-3 text-base gap-2.5",
  "2xl": "px-8 py-4 text-lg gap-3",
  icon: "p-2"
};
function Spinner() {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      className: "animate-spin h-4 w-4",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          }
        )
      ]
    }
  );
}
var Button = React4__default.default.forwardRef(function Button2({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  children,
  className,
  ...rest
}, ref) {
  const isDisabled = disabled || loading;
  const classes = [
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant] ?? variantStyles.primary,
    sizeStyles[size] ?? sizeStyles.md,
    fullWidth ? "w-full" : "",
    className ?? ""
  ].filter(Boolean).join(" ");
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    loading && /* @__PURE__ */ jsxRuntime.jsx(Spinner, {}),
    !loading && leftIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: leftIcon }),
    children && /* @__PURE__ */ jsxRuntime.jsx("span", { children }),
    !loading && rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: rightIcon })
  ] });
  if (href && !isDisabled) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ref,
        href,
        className: classes,
        ...rest,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      disabled: isDisabled,
      className: classes,
      ...rest,
      children: content
    }
  );
});
var variantStyles2 = {
  default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
  elevated: "bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/30",
  bordered: "bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600",
  interactive: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300",
  ghost: "bg-transparent"
};
var paddingStyles = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};
var Card = React4__default.default.forwardRef(function Card2({
  variant = "default",
  padding = "md",
  hover = false,
  as: Component = "div",
  children,
  className,
  onClick,
  role,
  ...rest
}, ref) {
  const hoverClass = hover ? "hover:shadow-xl transition-shadow duration-300" : "";
  const classes = [
    "rounded-xl",
    variantStyles2[variant] ?? variantStyles2.default,
    paddingStyles[padding] ?? paddingStyles.md,
    hoverClass,
    className ?? ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx(
    Component,
    {
      ref,
      className: classes,
      onClick,
      role: role ?? (onClick ? "button" : void 0),
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      ...rest,
      children
    }
  );
});
var sizeStyles2 = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4"
};
var backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
var contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 350 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.15 }
  }
};
function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true
}) {
  const contentRef = React4.useRef(null);
  const previousActiveElement = React4.useRef(null);
  const handleKeyDown = React4.useCallback(
    (e) => {
      if (e.key === "Escape" && closeOnEsc) {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !contentRef.current) return;
      const focusable = contentRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeOnEsc, onClose]
  );
  React4.useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      document.addEventListener("keydown", handleKeyDown);
      requestAnimationFrame(() => {
        contentRef.current?.focus();
      });
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    };
  }, [open, handleKeyDown]);
  const titleId = title ? "modal-title" : void 0;
  const descId = description ? "modal-desc" : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntime.jsxs(
    framerMotion.motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "aria-modal": "true",
      role: "dialog",
      "aria-labelledby": titleId,
      "aria-describedby": descId,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
            variants: backdropVariants,
            initial: "hidden",
            animate: "visible",
            exit: "hidden",
            onClick: closeOnOverlay ? onClose : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          framerMotion.motion.div,
          {
            ref: contentRef,
            tabIndex: -1,
            className: `relative w-full ${sizeStyles2[size]} bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 focus:outline-none`,
            variants: contentVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            children: [
              showClose && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsxRuntime.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              ),
              title && /* @__PURE__ */ jsxRuntime.jsx(
                "h2",
                {
                  id: titleId,
                  className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 pr-8",
                  children: title
                }
              ),
              description && /* @__PURE__ */ jsxRuntime.jsx("p", { id: descId, className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: description }),
              children
            ]
          }
        )
      ]
    }
  ) });
}
var positionStyles = {
  fixed: "fixed top-0 left-0 right-0 z-40",
  sticky: "sticky top-0 z-40",
  static: ""
};
var mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};
function Navbar({
  brand,
  links = [],
  cta,
  position = "sticky",
  transparent = false,
  blur = true
}) {
  const [mobileOpen, setMobileOpen] = React4.useState(false);
  const [scrolled, setScrolled] = React4.useState(false);
  const toggleMobile = React4.useCallback(() => setMobileOpen((v) => !v), []);
  React4.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const bgClasses = transparent ? scrolled ? "bg-white/80 dark:bg-gray-900/80" : "bg-transparent" : "bg-white dark:bg-gray-900";
  const blurClasses = blur && scrolled ? "backdrop-blur-lg" : "";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "nav",
    {
      className: `${positionStyles[position]} ${bgClasses} ${blurClasses} border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300`,
      role: "navigation",
      "aria-label": "Main navigation",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between h-16", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "a",
            {
              href: brand.href ?? "/",
              className: "flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity",
              children: [
                brand.logo && /* @__PURE__ */ jsxRuntime.jsx("img", { src: brand.logo, alt: "", className: "h-8 w-auto" }),
                brand.name
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
            links.map((link) => /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: link.href,
                className: "text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors",
                children: link.label
              },
              link.href + link.label
            )),
            cta && /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: cta.href,
                className: `inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${cta.variant === "outline" ? "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800" : cta.variant === "secondary" ? "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700" : cta.variant === "ghost" ? "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`,
                children: cta.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              className: "md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              onClick: toggleMobile,
              "aria-expanded": mobileOpen,
              "aria-label": "Toggle menu",
              children: mobileOpen ? /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(framerMotion.AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxRuntime.jsx(
          framerMotion.motion.div,
          {
            className: "md:hidden border-t border-gray-200 dark:border-gray-800",
            variants: mobileMenuVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-4 py-3 space-y-1 bg-white dark:bg-gray-900", children: [
              links.map((link) => /* @__PURE__ */ jsxRuntime.jsx(
                "a",
                {
                  href: link.href,
                  className: "block py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
                  onClick: () => setMobileOpen(false),
                  children: link.label
                },
                link.href + link.label
              )),
              cta && /* @__PURE__ */ jsxRuntime.jsx(
                "a",
                {
                  href: cta.href,
                  className: "block mt-2 px-4 py-2 text-center text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700",
                  onClick: () => setMobileOpen(false),
                  children: cta.label
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
var heightStyles = {
  auto: "py-20 md:py-32",
  screen: "min-h-screen",
  half: "min-h-[50vh]"
};
function ctaButtonClasses(variant) {
  switch (variant) {
    case "secondary":
      return "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 shadow-sm";
    case "outline":
      return "border border-white/50 text-white hover:bg-white/10";
    default:
      return "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25";
  }
}
function Hero({
  title,
  subtitle,
  description,
  cta,
  image,
  alignment = "center",
  overlay = true,
  height = "auto"
}) {
  const alignClasses = alignment === "center" ? "text-center items-center" : "text-left items-start";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "section",
    {
      className: `relative flex items-center w-full overflow-hidden ${heightStyles[height]}`,
      children: [
        image && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "img",
            {
              src: image,
              alt: "",
              className: "absolute inset-0 w-full h-full object-cover"
            }
          ),
          overlay && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 bg-black/50 dark:bg-black/70" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `flex flex-col gap-6 ${alignClasses}`, children: [
          subtitle && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest text-blue-400", children: subtitle }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "h1",
            {
              className: `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${image && overlay ? "text-white" : "text-gray-900 dark:text-white"}`,
              children: title
            }
          ),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "p",
            {
              className: `max-w-2xl text-lg sm:text-xl ${image && overlay ? "text-gray-200" : "text-gray-500 dark:text-gray-400"}`,
              children: description
            }
          ),
          cta && (cta.primary || cta.secondary) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-4 mt-2", children: [
            cta.primary && /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: cta.primary.href,
                className: `inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${ctaButtonClasses(cta.primary.variant)}`,
                children: cta.primary.label
              }
            ),
            cta.secondary && /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: cta.secondary.href,
                className: `inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl transition-all duration-200 ${ctaButtonClasses(cta.secondary.variant)}`,
                children: cta.secondary.label
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function Pricing({ plans }) {
  if (!plans || plans.length === 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-20 md:py-32 bg-gray-50 dark:bg-gray-950", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: `grid gap-8 ${plans.length === 1 ? "max-w-md mx-auto" : plans.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"}`,
      children: plans.map((plan) => /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: `relative flex flex-col rounded-2xl p-8 border transition-shadow duration-300 ${plan.highlighted ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/25 scale-[1.02]" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg"}`,
          children: [
            plan.highlighted && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white text-blue-600 shadow", children: "Popular" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "h3",
              {
                className: `text-xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`,
                children: plan.name
              }
            ),
            plan.description && /* @__PURE__ */ jsxRuntime.jsx(
              "p",
              {
                className: `mt-2 text-sm ${plan.highlighted ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`,
                children: plan.description
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-6 mb-8", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: `text-5xl font-extrabold tracking-tight ${plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`,
                  children: typeof plan.price === "number" ? `$${plan.price}` : plan.price
                }
              ),
              plan.interval && /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  className: `text-sm font-medium ${plan.highlighted ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`,
                  children: [
                    "/",
                    plan.interval
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "space-y-3 mb-8 flex-1", children: plan.features.map((feature, idx) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-start gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "svg",
                {
                  className: `w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? "text-blue-200" : "text-blue-500"}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: plan.highlighted ? "text-blue-100" : "text-gray-600 dark:text-gray-300",
                  children: feature
                }
              )
            ] }, idx)) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: plan.cta.href,
                className: `block w-full text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${plan.highlighted ? "bg-white text-blue-600 hover:bg-gray-100 shadow" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`,
                children: plan.cta.label
              }
            )
          ]
        },
        plan.name
      ))
    }
  ) }) });
}
function Stars({ rating }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-0.5", "aria-label": `${rating} out of 5 stars`, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className: `w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`,
      fill: "currentColor",
      viewBox: "0 0 20 20",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    },
    i
  )) });
}
function Testimonials({
  testimonials,
  variant = "grid",
  columns = 3
}) {
  if (!testimonials || testimonials.length === 0) return null;
  const colClass = columns === 1 ? "grid-cols-1" : columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  const layoutClass = variant === "masonry" ? `${colClass} auto-rows-auto space-y-8` : `${colClass} gap-8`;
  return /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-20 md:py-32", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: `grid ${layoutClass}`, children: testimonials.map((t, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            className: "absolute top-6 right-6 w-8 h-8 text-blue-100 dark:text-blue-900/50",
            fill: "currentColor",
            viewBox: "0 0 32 32",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" })
          }
        ),
        t.rating && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntime.jsx(Stars, { rating: t.rating }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("blockquote", { className: "text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 relative z-10", children: [
          "\u201C",
          t.quote,
          "\u201D"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 mt-auto", children: [
          t.avatar ? /* @__PURE__ */ jsxRuntime.jsx(
            "img",
            {
              src: t.avatar,
              alt: t.author,
              className: "w-10 h-10 rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm", children: t.author.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: t.author }),
            (t.role || t.company) && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
              t.role,
              t.role && t.company && " \xB7 ",
              t.company
            ] })
          ] })
        ] })
      ]
    },
    idx
  )) }) }) });
}
function FeatureGrid({
  features,
  columns = 3,
  variant = "default"
}) {
  if (!features || features.length === 0) return null;
  const colClass = columns === 1 ? "grid-cols-1" : columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  const isCard = variant === "card";
  return /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-20 md:py-32", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: `grid ${colClass} gap-8`, children: features.map((feature, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: isCard ? "rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300" : "",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: `inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-4 ${variant === "numbered" ? "relative" : ""}`,
            children: variant === "numbered" ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-lg font-bold", children: idx + 1 }) : feature.icon
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: feature.title }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 leading-relaxed", children: feature.description })
      ]
    },
    idx
  )) }) }) });
}
function Newsletter({
  onSubmit,
  title = "Stay in the loop",
  description = "Get the latest updates delivered to your inbox.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  variant = "inline"
}) {
  const [email, setEmail] = React4.useState("");
  const [loading, setLoading] = React4.useState(false);
  const [error, setError] = React4.useState("");
  const [success, setSuccess] = React4.useState(false);
  const handleSubmit = React4.useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      setLoading(true);
      try {
        await onSubmit(email);
        setSuccess(true);
        setEmail("");
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, onSubmit]
  );
  return /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-20 md:py-32", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: `max-w-2xl mx-auto ${variant === "stacked" ? "text-center" : ""}`,
      children: [
        title && /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-3 text-lg text-gray-500 dark:text-gray-400", children: description }),
        !success ? /* @__PURE__ */ jsxRuntime.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: `mt-8 ${variant === "inline" ? "flex flex-col sm:flex-row gap-3" : "flex flex-col gap-3"}`,
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: "newsletter-email", className: "sr-only", children: "Email address" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "input",
                  {
                    id: "newsletter-email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder,
                    required: true,
                    className: "w-full px-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                "button",
                {
                  type: "submit",
                  disabled: loading,
                  className: "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none shadow-sm transition-all duration-200",
                  children: [
                    loading ? /* @__PURE__ */ jsxRuntime.jsxs(
                      "svg",
                      {
                        className: "animate-spin h-4 w-4 mr-2",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(
                            "circle",
                            {
                              className: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              strokeWidth: "4"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntime.jsx(
                            "path",
                            {
                              className: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            }
                          )
                        ]
                      }
                    ) : null,
                    buttonText
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-8 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm font-medium text-center", children: "\u2713 Thanks for subscribing! Check your inbox for a confirmation email." }),
        error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-3 text-sm text-red-600 dark:text-red-400", children: error })
      ]
    }
  ) }) });
}
function FormField({
  label,
  error,
  required = false,
  children,
  helperText
}) {
  const id = React4__default.default.useId();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "label",
      {
        htmlFor: id,
        className: "text-sm font-medium text-gray-700 dark:text-gray-300",
        children: [
          label,
          required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500 ml-0.5", "aria-hidden": "true", children: "*" })
        ]
      }
    ),
    React4__default.default.isValidElement(children) ? React4__default.default.cloneElement(children, {
      id,
      "aria-describedby": error ? `${id}-error` : helperText ? `${id}-helper` : void 0,
      "aria-invalid": !!error,
      required
    }) : children,
    helperText && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: `${id}-helper`, className: "text-xs text-gray-500 dark:text-gray-400", children: helperText }),
    error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: `${id}-error`, className: "text-xs text-red-600 dark:text-red-400", role: "alert", children: error })
  ] });
}
var inputBase = "w-full px-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0";
var inputNormal = "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500";
var inputError = "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500";
var inputDisabled = "opacity-50 pointer-events-none bg-gray-100 dark:bg-gray-800";
var FormInput = React4__default.default.forwardRef(
  function FormInput2({ className, error: hasError, disabled, ...rest }, ref) {
    const classes = [
      inputBase,
      hasError ? inputError : inputNormal,
      disabled ? inputDisabled : "",
      className ?? ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxRuntime.jsx("input", { ref, className: classes, disabled, ...rest });
  }
);
var FormTextarea = React4__default.default.forwardRef(function FormTextarea2({ className, error: hasError, disabled, ...rest }, ref) {
  const classes = [
    inputBase,
    "resize-y min-h-[100px]",
    hasError ? inputError : inputNormal,
    disabled ? inputDisabled : "",
    className ?? ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx("textarea", { ref, className: classes, disabled, ...rest });
});
var FormSelect = React4__default.default.forwardRef(
  function FormSelect2({ className, error: hasError, disabled, options, children, ...rest }, ref) {
    const classes = [
      inputBase,
      "appearance-none cursor-pointer",
      hasError ? inputError : inputNormal,
      disabled ? inputDisabled : "",
      className ?? ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxRuntime.jsx("select", { ref, className: classes, disabled, ...rest, children: options ? options.map(
      (opt, i) => typeof opt === "string" ? /* @__PURE__ */ jsxRuntime.jsx("option", { value: opt, children: opt }, i) : /* @__PURE__ */ jsxRuntime.jsx("option", { value: opt.value, children: opt.label }, i)
    ) : children });
  }
);
var FormCheckbox = React4__default.default.forwardRef(function FormCheckbox2({ className, label, error: hasError, disabled, id, ...rest }, ref) {
  const generatedId = React4__default.default.useId();
  const checkboxId = id ?? generatedId;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        type: "checkbox",
        id: checkboxId,
        disabled,
        className: `w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 ${hasError ? "border-red-500" : ""} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className ?? ""}`,
        ...rest
      }
    ),
    label && /* @__PURE__ */ jsxRuntime.jsx(
      "label",
      {
        htmlFor: checkboxId,
        className: `text-sm ${disabled ? "text-gray-400 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`,
        children: label
      }
    )
  ] });
});
function FormLabel({
  children,
  required = false,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      className: `text-sm font-medium text-gray-700 dark:text-gray-300 ${className ?? ""}`,
      ...rest,
      children: [
        children,
        required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500 ml-0.5", "aria-hidden": "true", children: "*" })
      ]
    }
  );
}
function FormError({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      className: `text-xs text-red-600 dark:text-red-400 ${className ?? ""}`,
      role: "alert",
      children
    }
  );
}

exports.Button = Button;
exports.Card = Card;
exports.FeatureGrid = FeatureGrid;
exports.FormCheckbox = FormCheckbox;
exports.FormError = FormError;
exports.FormField = FormField;
exports.FormInput = FormInput;
exports.FormLabel = FormLabel;
exports.FormSelect = FormSelect;
exports.FormTextarea = FormTextarea;
exports.Hero = Hero;
exports.Modal = Modal;
exports.Navbar = Navbar;
exports.Newsletter = Newsletter;
exports.Pricing = Pricing;
exports.Testimonials = Testimonials;
