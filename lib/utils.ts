import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"

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
    day: '2-digit',
    month: 'short',
    // year: 'numeric',
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

// Credits: JavaScript Mastery 
// #ai vs #AI

// w3schools.com JavaScript Mastery
// #meme #memes #softwareengineer #memestiktok #programmingmemes #webdev #codingmemes #programmer #java #python #javascript #memecoding #computers #nestjs #developer #nerd #programmerhumor #chatgpt #programminghumor #codinglife #stackoverflow #devhumor #dev #tech #sociallpost