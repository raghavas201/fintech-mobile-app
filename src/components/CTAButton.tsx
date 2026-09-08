import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function CTAButton({ label, onPress, disabled, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  disabled: { backgroundColor: colors.border },
  label: { ...typography.button, color: colors.white },
});
