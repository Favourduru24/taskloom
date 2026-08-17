import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatar(userPicture: string | null, userEmail: string) {
  return userPicture ?? `https://avatar.vercel.sh/${userEmail}`;
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'No date';

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return 'Invalid date';

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
export function formatNotificationDate(date: string | Date | null | undefined): string {
  if (!date) return 'No date';

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return 'Invalid date';

  return d.toLocaleDateString('en-GB', {
    minute: 'numeric',
    day: '2-digit',
    month: 'short',
  });
}

export function formUrlQuery({ params, key, value }: { params: string, key: string, value: string }) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: { params: string, keysToRemove: string[] }) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const getTextPreview = (text: string = "", maxLength = 100) => {
  const sentences = text
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const preview: string[] = [];
  let characterCount = 0;

  for (const sentence of sentences) {
    const formattedSentence = `${sentence}.`;

    if (characterCount + formattedSentence.length > maxLength) {
      break;
    }

    preview.push(formattedSentence);
    characterCount += formattedSentence.length;
  }

  return {
    preview,
    sentences,
    hasMore: preview.length < sentences.length,
  };
};

export const formatUsername = (name: string)=> { 
   const first = name.trim().charAt(0)
   return `${first}`
}

export const buildReminderUrl = (message: string, contactNumber: string) =>  {
  if (!contactNumber) {
    toast.error("Contact number is required to build reminder URL."); 
    return null;
  }

  const cleaned = contactNumber.replace(/\D/g, "");

  if (!/^0\d{10}$/.test(cleaned) && !/^\d{10,}$/.test(cleaned)) return null;

  return `https://wa.me/${cleaned.replace(/^0/, "234")}?text=${encodeURIComponent(
    message,
  )}`;
}

// Credits: JavaScript Mastery 
// #ai vs #AI

// w3schools.com JavaScript Mastery
// #meme #memes #softwareengineer #memestiktok #programmingmemes #webdev #codingmemes #programmer #java #python #javascript #memecoding #computers #nestjs #developer #nerd #programmerhumor #chatgpt #programminghumor #codinglife #stackoverflow #devhumor #dev #tech #sociallpost