import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
import { toast } from "sonner";

type RetryOptions = {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
};

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
   const first = name?.trim()?.charAt(0)
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

function getStatus(error: any): number | undefined {
  return error?.response?.status ?? error?.status;
}

function getRetryAfter(error: any): number | undefined {
  
  const value = error?.response?.headers?.['retry-after'];

  console.log('Retry-After header value:', value);

  if (value == null) return undefined;

  // Retry-After may contain seconds or an HTTP date.
  const seconds = Number(value);

  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }

  const date = Date.parse(value);

  return Number.isNaN(date)
    ? undefined
    : Math.max(0, date - Date.now());
}

function isRetryable(error: any): boolean {
  const status = getStatus(error);

  // Network errors and timeouts without an HTTP response.
  if (!status) return true;

  // Temporary server errors and rate limiting.
  return status === 429 || status >= 500;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retryApiRequest<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelayMs = 500,
    maxDelayMs = 5000,
  } = options;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (!isRetryable(error) || attempt === maxAttempts) {
        throw error;
      }

      const retryAfter = getRetryAfter(error);

      // Exponential backoff with jitter.
      const exponentialDelay = Math.min(
        baseDelayMs * 2 ** (attempt - 1),
        maxDelayMs,
      );

      const jitter = Math.random() * exponentialDelay * 0.25;

      const delay =
        retryAfter !== undefined
          ? retryAfter
          : exponentialDelay + jitter;

      await sleep(delay);
    }
  }

  throw new Error('Request failed after all retry attempts.');
}