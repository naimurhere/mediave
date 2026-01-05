
import React from 'react';
import { 
  Play, 
  Layers, 
  TrendingUp, 
  Zap, 
  Video, 
  CheckCircle2 
} from 'lucide-react';
import { Service, PricingPlan, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'short-form',
    title: 'Short-Form Mastery',
    description: 'High-energy TikTok, Reels, and Shorts designed for maximum virality and retention.',
    icon: 'Zap'
  },
  {
    id: 'youtube',
    title: 'YouTube Growth',
    description: 'Full-length video editing with cinematic pacing, storytelling, and custom thumbnails.',
    icon: 'Play'
  },
  {
    id: 'corporate',
    title: 'Corporate Films',
    description: 'Polished, professional brand stories that establish authority and trust.',
    icon: 'Layers'
  },
  {
    id: 'ads',
    title: 'High-Impact Ads',
    description: 'Data-driven creative that converts viewers into customers with precision editing.',
    icon: 'TrendingUp'
  }
];

export const PRICING: PricingPlan[] = [
  {
    name: 'Standard',
    price: '$999',
    description: 'Perfect for consistent growth.',
    features: ['8 Short-form Videos', '2 YouTube Videos', 'Color Grading', 'Subtitles included']
  },
  {
    name: 'Premium',
    price: '$1,999',
    description: 'The complete wave-maker package.',
    features: ['15 Short-form Videos', '4 YouTube Videos', 'Custom Thumbnails', 'Strategic Hook Consulting', '24h Support'],
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For high-volume creators and brands.',
    features: ['Unlimited Shorts', 'Weekly Long-form', 'Dedicated Account Manager', 'On-site filming options', 'Omnichannel Strategy']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Tech Creator (1.2M Subs)',
    content: "Mediave transformed my retention rates. My average view duration increased by 35% after the first month.",
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial1/800/1422',
    resultMetric: '+35%',
    resultLabel: 'Avg Retention'
  },
  {
    id: '2',
    name: 'Mark Russo',
    role: 'CEO, Flux Global',
    content: "Their corporate films are in a league of their own. They capture our brand identity perfectly.",
    avatar: 'https://picsum.photos/seed/mark/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial2/800/1422',
    resultMetric: '2.4M',
    resultLabel: 'Reach'
  },
  {
    id: '3',
    name: 'Elena Vost',
    role: 'Fitness Coach',
    content: "I went from 2k to 50k followers in 3 months. The hooks they write are absolute magic.",
    avatar: 'https://picsum.photos/seed/elena/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial3/800/1422',
    resultMetric: '15x',
    resultLabel: 'Growth'
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'E-com Founder',
    content: "ROAS went through the roof. Their ad edits are the only ones that actually convert on TikTok.",
    avatar: 'https://picsum.photos/seed/david/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial4/800/1422',
    resultMetric: '4.2',
    resultLabel: 'ROAS'
  }
];

export const RETENTION_DATA = [
  { time: '0s', original: 100, mediave: 100 },
  { time: '10s', original: 70, mediave: 85 },
  { time: '20s', original: 55, mediave: 78 },
  { time: '30s', original: 45, mediave: 72 },
  { time: '40s', original: 38, mediave: 68 },
  { time: '50s', original: 32, mediave: 65 },
  { time: '60s', original: 28, mediave: 60 },
];
