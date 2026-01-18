import React from 'react';
import { Home, Briefcase, Sparkles, Sofa, Building, CheckCircle, SprayCan, Droplets, Star } from 'lucide-react';

export const getIconComponent = (iconName: string, className: string = "w-6 h-6") => {
  const icons: { [key: string]: React.ReactNode } = {
    'Home': <Home className={className} />,
    'Briefcase': <Briefcase className={className} />,
    'Building': <Building className={className} />,
    'Sofa': <Sofa className={className} />,
    'Sparkles': <Sparkles className={className} />,
    'CheckCircle': <CheckCircle className={className} />,
    'SprayCan': <SprayCan className={className} />,
    'Droplets': <Droplets className={className} />,
    'Star': <Star className={className} />
  };

  return icons[iconName] || <Sparkles className={className} />;
};

export const iconOptions = [
  'Home', 'Briefcase', 'Building', 'Sofa', 'Sparkles', 'CheckCircle', 'SprayCan', 'Droplets', 'Star'
];