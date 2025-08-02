import { Text, type TextProps } from 'react-native';

export function ThemedText({ className, ...props }: TextProps) {
  return <Text className={`${className}`} {...props} />;
}
