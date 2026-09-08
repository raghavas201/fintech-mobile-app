import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { EMIPlan } from '../types/marketplace';
import { colors, radius, spacing, typography } from '../theme/theme';

interface Props {
  plan: EMIPlan;
  selected: boolean;
  onSelect: () => void;
}

export default function EMIPlanCard({ plan, selected, onSelect }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selected]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      <View style={styles.radio}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <View style={styles.details}>
        <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
        <Text style={styles.sub}>
          ₹{plan.monthlyAmount.toLocaleString('en-IN')}/mo · {plan.interestRate}% p.a.
        </Text>
      </View>
      <Text style={styles.total}>₹{plan.totalPayable.toLocaleString('en-IN')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.surface },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  details: { flex: 1 },
  tenure: { ...typography.body, fontWeight: '600', color: colors.text },
  sub: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  total: { ...typography.body, fontWeight: '700', color: colors.text },
});
