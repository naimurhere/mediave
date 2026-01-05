
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  videoThumbnail: string;
  resultMetric: string;
  resultLabel: string;
  videoUrl?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
