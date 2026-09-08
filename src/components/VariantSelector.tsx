import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ProductVariant } from '../types/marketplace';
import { colors, radius, spacing, typography } from '../theme/theme';

interface Props {
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (variant: ProductVariant) => void;
}

export default function VariantSelector({ variants, selectedId, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select variant</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {variants.map((v) => {
          const selected = v.id === selectedId;
          return (
            <TouchableOpacity
              key={v.id}
              onPress={() => v.inStock && onSelect(v)}
              disabled={!v.inStock}
              style={[
                styles.chip,
                selected && styles.chipSelected,
                !v.inStock && styles.chipDisabled,
              ]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {v.label}{!v.inStock ? ' (Out of stock)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: spacing.md },
  label: { ...typography.h2, fontSize: 14, color: colors.text, marginBottom: spacing.sm },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  chipSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  chipDisabled: { opacity: 0.4 },
  chipText: { ...typography.body, fontSize: 13, color: colors.text },
  chipTextSelected: { color: colors.white, fontWeight: '600' },
});
