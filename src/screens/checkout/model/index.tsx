export interface CheckoutSelectorProps {
  emission: string;
  product: string;
  model: string;
  media: string;
  validity: string;
}

export interface ProductProps {
  checkout: CheckoutSelectorProps;
}

export interface StepperProps {
  steps: string[];
  currentStep: string;
}

// View
export interface CheckoutViewProps {
  themeStretch: boolean;
  steps: string[];
  checkout: CheckoutSelectorProps;
}

// Cart
export interface CartProps {
  checkout: CheckoutSelectorProps;
}

// Prevent Consult
export interface PreventConsultProps {
  setCurrentStep: (value: string) => void;
  makeConsult: boolean;
  setMakeConsult: (value: boolean) => void;
}

// Identification
export interface IdentificationProps {
  
}