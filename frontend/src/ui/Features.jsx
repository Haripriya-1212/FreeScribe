import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
import {
//   IconAdjustmentsBolt,
//   IconCloud,
//   IconCurrencyDollar,
//   IconEaseInOut,
  IconHeart,
//   IconHelp,
//   IconRouteAltLeft,
//   IconTerminal2,
//   IconMic,
  IconMicrophone,
  IconEaseInOut,
  IconCurrencyDollar,
  IconCloud,
  IconBrain,
  IconUsers,
  IconDeviceMobile,
  IconLock,
  IconUpload,
  IconBolt,
  IconBrandReact,
  IconDatabase,
} from '@tabler/icons-react';

export function Features() {
    const features = [
        {
          title: 'Effortless Transcription',
          description: 'Transform audio into text with unparalleled accuracy and speed.',
        //   icon: <IconMic />,
        icon: <IconMicrophone />,
        },
        {
          title: 'User-Friendly Interface',
          description: 'Intuitive design that makes transcription a breeze for everyone.',
          icon: <IconEaseInOut />,
        },
        {
            title: 'Record or Upload Audio',
            description: 'Easily record audio or upload existing files for transcription.',
            icon: <IconUpload />,
        },
        {
          title: 'Reliable Performance',
          description: 'Experience seamless transcription with our highly optimized platform.',
          icon: <IconBolt />,
        },
        {
          title: 'Advanced AI Model',
          description: 'Powered by OpenAI’s Whisper-Tiny for state-of-the-art transcription capabilities.',
          icon: <IconBrain />,
        },
        {
            title: 'Built using React',
            description: 'Crafted using React for a dynamic and responsive user experience.',
            icon: <IconBrandReact />,
        },
        {
            title: 'Data Stored in MongoDB',
            description: 'Your transcription data is securely stored and managed in MongoDB.',
            icon: <IconDatabase />,
        },
        {
          title: 'User Experience',
          description: 'Crafted with care, offering a smooth and intuitive user experience.',
          icon: <IconHeart />,
        },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl ">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
