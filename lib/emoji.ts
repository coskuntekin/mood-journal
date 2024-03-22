export const getEmojiByMood = (mood: string): string => {
  switch (mood) {
    case 'happy':
      return '😄';
    case 'sad':
      return '😢';
    case 'angry':
      return '😡';
    case 'sleepy':
      return '😴';
    case 'love':
      return '😍';
    default:
      return '';
  }
};
