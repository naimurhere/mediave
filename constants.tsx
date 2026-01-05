
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
    features: ['Unlimited Scale', 'Dedicated Creative Director', 'Omnichannel Strategy', 'On-site filming options', 'Omnichannel Strategy']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'lucy',
    name: 'Tech With Lucy',
    role: 'Educator',
    content: "Very quick turnaround and high quality videos, and I like how once I provide feedback, the revisions get done very fast",
    avatar: 'https://i.postimg.cc/brnsDPHc/68036488ab416829b3fce75e-1688975462936.avif',
    videoThumbnail: 'https://picsum.photos/seed/lucy/1080/1920',
    resultMetric: 'Fast',
    resultLabel: 'Turnaround',
    videoUrl: 'https://vimeo.com/1135498536'
  },
  {
    id: '0',
    name: 'Nick Barner',
    role: 'Content Creator',
    content: "Honestly, they are the best in the game, and I highly recommend.",
    avatar: 'https://i.postimg.cc/VkrX9yfv/680356c0c9efdd38b5c112cc-images.avif',
    videoThumbnail: 'https://picsum.photos/seed/nickv/1080/1920',
    resultMetric: '10M+',
    resultLabel: 'Organic Reach',
    videoUrl: 'https://vimeo.com/1116334991'
  },
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Tech Creator (1.2M Subs)',
    content: "Mediave transformed my retention rates. My average view duration increased by 35% after the first month.",
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial1/1080/1920',
    resultMetric: '+35%',
    resultLabel: 'Avg Retention',
    videoUrl: 'https://vimeo.com/1116334991'
  },
  {
    id: '2',
    name: 'Mark Russo',
    role: 'CEO, Flux Global',
    content: "Their corporate films are in a league of their own. They capture our brand identity perfectly.",
    avatar: 'https://picsum.photos/seed/mark/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial2/1080/1920',
    resultMetric: '2.4M',
    resultLabel: 'Reach',
    videoUrl: 'https://vimeo.com/1116334991'
  },
  {
    id: '3',
    name: 'Elena Vost',
    role: 'Fitness Coach',
    content: "I went from 2k to 50k followers in 3 months. The hooks they write are absolute magic.",
    avatar: 'https://picsum.photos/seed/elena/100/100',
    videoThumbnail: 'https://picsum.photos/seed/testimonial3/1080/1920',
    resultMetric: '15x',
    resultLabel: 'Growth',
    videoUrl: 'https://vimeo.com/1116334991'
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
