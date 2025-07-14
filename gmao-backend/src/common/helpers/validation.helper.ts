// src/common/helpers/validation.helper.ts
import { ValidationArguments } from 'class-validator';

export function getValidationMessage(
  messages: { [key: string]: string },
  defaultMessage: string,
  args: ValidationArguments,
): string {
  // Get language from request (you'll need to implement this based on your app)
  const lang = (args.object as any).lang || 'fr'; // Default to French

  return messages[lang] || defaultMessage;
}
