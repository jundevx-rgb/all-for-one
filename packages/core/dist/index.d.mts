import * as React from 'react';
import React__default from 'react';

interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual variant */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
    /** Size preset */
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'icon';
    /** Show a loading spinner and disable the button */
    loading?: boolean;
    /** Icon rendered before children */
    leftIcon?: React__default.ReactNode;
    /** Icon rendered after children */
    rightIcon?: React__default.ReactNode;
    /** Stretch to full width of container */
    fullWidth?: boolean;
    /** When provided renders as an <a> tag instead of <button> */
    href?: string;
}
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

interface CardProps {
    /** Visual variant */
    variant?: 'default' | 'elevated' | 'bordered' | 'interactive' | 'ghost';
    /** Inner padding size */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Force hover elevation (for non-interactive variants) */
    hover?: boolean;
    /** Override the rendered element (e.g. 'article', 'section', 'li') */
    as?: React__default.ElementType;
    children: React__default.ReactNode;
    className?: string;
    onClick?: () => void;
    role?: string;
}
declare const Card: React__default.ForwardRefExoticComponent<CardProps & React__default.RefAttributes<HTMLElement>>;

interface ModalProps {
    /** Whether the modal is visible */
    open: boolean;
    /** Called when the modal requests to close */
    onClose: () => void;
    /** Accessible title */
    title?: string;
    /** Accessible description (aria-describedby) */
    description?: string;
    /** Width preset */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React__default.ReactNode;
    /** Show the close (X) button in the top-right corner */
    showClose?: boolean;
    /** Close when the overlay/backdrop is clicked */
    closeOnOverlay?: boolean;
    /** Close when the Escape key is pressed */
    closeOnEsc?: boolean;
}
declare function Modal({ open, onClose, title, description, size, children, showClose, closeOnOverlay, closeOnEsc, }: ModalProps): React__default.JSX.Element;

interface NavLink {
    label: string;
    href: string;
}
interface NavCTA {
    label: string;
    href: string;
    /** Button variant matching the Button component */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}
interface NavbarProps {
    /** Brand identity */
    brand: {
        /** Optional logo image URL */
        logo?: string;
        /** Brand name text */
        name: string;
        /** Link for the brand */
        href?: string;
    };
    /** Navigation links */
    links?: NavLink[];
    /** Call-to-action button */
    cta?: NavCTA;
    /** Positioning */
    position?: 'fixed' | 'sticky' | 'static';
    /** Transparent background (useful for hero overlays) */
    transparent?: boolean;
    /** Backdrop blur when scrolling / not transparent */
    blur?: boolean;
}
declare function Navbar({ brand, links, cta, position, transparent, blur, }: NavbarProps): React.JSX.Element;

interface HeroCTA {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
}
interface HeroProps {
    /** Main heading */
    title: string;
    /** Sub-heading / eyebrow text */
    subtitle?: string;
    /** Body / description text */
    description?: string;
    /** Call-to-action buttons */
    cta?: {
        primary?: HeroCTA;
        secondary?: HeroCTA;
    };
    /** Background image URL */
    image?: string;
    /** Text alignment */
    alignment?: 'left' | 'center';
    /** Dark overlay on the background image */
    overlay?: boolean;
    /** Section height */
    height?: 'auto' | 'screen' | 'half';
}
declare function Hero({ title, subtitle, description, cta, image, alignment, overlay, height, }: HeroProps): React.JSX.Element;

interface PricingPlan {
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
interface PricingProps {
    /** Array of pricing plans */
    plans: PricingPlan[];
    /** Billing interval label (e.g. 'monthly', 'yearly') */
    interval?: 'monthly' | 'yearly';
}
declare function Pricing({ plans }: PricingProps): React.JSX.Element | null;

interface Testimonial {
    /** The testimonial quote text */
    quote: string;
    /** Author name */
    author: string;
    /** Author role / title */
    role?: string;
    /** Author avatar URL */
    avatar?: string;
    /** Company name */
    company?: string;
    /** Rating 1-5 */
    rating?: number;
}
interface TestimonialsProps {
    /** Array of testimonials */
    testimonials: Testimonial[];
    /** Layout variant */
    variant?: 'grid' | 'carousel' | 'masonry';
    /** Number of columns (for grid/masonry, default 3) */
    columns?: 1 | 2 | 3 | 4;
}
declare function Testimonials({ testimonials, variant, columns, }: TestimonialsProps): React.JSX.Element | null;

interface Feature {
    /** Icon element (React node) for the feature */
    icon: React__default.ReactNode;
    /** Feature title */
    title: string;
    /** Feature description */
    description: string;
}
interface FeatureGridProps {
    /** Array of features to display */
    features: Feature[];
    /** Number of grid columns (default 3) */
    columns?: 1 | 2 | 3 | 4;
    /** Visual variant */
    variant?: 'default' | 'numbered' | 'card';
}
declare function FeatureGrid({ features, columns, variant, }: FeatureGridProps): React__default.JSX.Element | null;

interface NewsletterProps {
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
declare function Newsletter({ onSubmit, title, description, placeholder, buttonText, variant, }: NewsletterProps): React.JSX.Element;

interface FormFieldProps {
    /** Label text */
    label: string;
    /** Error message string */
    error?: string;
    /** Whether this field is required */
    required?: boolean;
    /** Input form elements */
    children: React__default.ReactNode;
    /** Optional helper text */
    helperText?: string;
}
declare function FormField({ label, error, required, children, helperText, }: FormFieldProps): React__default.JSX.Element;
interface FormInputProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}
declare const FormInput: React__default.ForwardRefExoticComponent<FormInputProps & React__default.RefAttributes<HTMLInputElement>>;
interface FormTextareaProps extends React__default.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}
declare const FormTextarea: React__default.ForwardRefExoticComponent<FormTextareaProps & React__default.RefAttributes<HTMLTextAreaElement>>;
interface FormSelectProps extends React__default.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    /** Options array — can be strings or { value, label } objects */
    options?: (string | {
        value: string;
        label: string;
    })[];
}
declare const FormSelect: React__default.ForwardRefExoticComponent<FormSelectProps & React__default.RefAttributes<HTMLSelectElement>>;
interface FormCheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Label shown next to the checkbox */
    label?: string;
    error?: boolean;
}
declare const FormCheckbox: React__default.ForwardRefExoticComponent<FormCheckboxProps & React__default.RefAttributes<HTMLInputElement>>;
interface FormLabelProps extends React__default.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}
declare function FormLabel({ children, required, className, ...rest }: FormLabelProps): React__default.JSX.Element;
interface FormErrorProps {
    children: React__default.ReactNode;
    className?: string;
}
declare function FormError({ children, className }: FormErrorProps): React__default.JSX.Element;

export { Button, type ButtonProps, Card, type CardProps, type Feature, FeatureGrid, type FeatureGridProps, FormCheckbox, type FormCheckboxProps, FormError, type FormErrorProps, FormField, type FormFieldProps, FormInput, type FormInputProps, FormLabel, type FormLabelProps, FormSelect, type FormSelectProps, FormTextarea, type FormTextareaProps, Hero, type HeroCTA, type HeroProps, Modal, type ModalProps, type NavCTA, type NavLink, Navbar, type NavbarProps, Newsletter, type NewsletterProps, Pricing, type PricingPlan, type PricingProps, type Testimonial, Testimonials, type TestimonialsProps };
