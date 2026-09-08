import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CTAButton from './CTAButton';
import { colors, spacing, typography } from '../theme/theme';

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      <CTAButton label="Retry" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: spacing.sm },
  title: { ...typography.h2, color: colors.text },
  message: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.md },
});
