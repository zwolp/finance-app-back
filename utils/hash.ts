import {createHmac} from 'crypto';

export const hash = (originalText: string, salt: string): string => {
  return createHmac('sha512', salt)
    .update(originalText)
    .digest('hex')
}