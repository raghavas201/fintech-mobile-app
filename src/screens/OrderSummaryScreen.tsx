import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CTAButton from '../components/CTAButton';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function OrderSummaryScreen({ route, navigation }: any) {
  const { product, variant, plan } = route.params;

  const rows = [
    { label: 'Product', value: product.name },
    { label: 'Variant', value: variant.label },
    { label: 'Store', value: product.brand },
    { label: 'Tenure', value: `${plan.tenureMonths} months` },
    { label: 'Monthly amount', value: `₹${plan.monthlyAmount.toLocaleString('en-IN')}` },
    { label: 'Interest', value: plan.interestRate === 0 ? 'No-cost EMI' : `${plan.interestRate}% p.a.` },
    { label: 'Processing fee', value: `₹${plan.processingFee.toLocaleString('en-IN')}` },
  ];

  const handleConfirm = () => {
    Alert.alert(
      'Order confirmed',
      `Your EMI plan for ${product.name} has been set up. This is a mock confirmation — wire this up to a real checkout API when the backend is ready.`,
      [{ text: 'Done', onPress: () => navigation.popToTop() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}>
        <View style={styles.productRow}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productVariant}>{variant.label}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan summary</Text>
          {rows.map((row) => (
            <View key={row.label} style={styles.row}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total payable</Text>
            <Text style={styles.totalValue}>₹{plan.totalPayable.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          This EMI is backed by your mutual fund investments. No credit score check.
          Amount will be deducted automatically each month.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <CTAButton label="Confirm & Proceed" onPress={handleConfirm} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  image: { width: 64, height: 64, borderRadius: radius.sm, backgroundColor: colors.surface },
  productName: { ...typography.h2, color: colors.text },
  productVariant: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  cardTitle: { ...typography.h2, fontSize: 15, color: colors.text, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  rowLabel: { ...typography.body, color: colors.textMuted },
  rowValue: { ...typography.body, color: colors.text, fontWeight: '600' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  totalLabel: { ...typography.h2, fontSize: 15, color: colors.text },
  totalValue: { ...typography.h2, fontSize: 15, color: colors.primary },
  disclaimer: { ...typography.caption, color: colors.textMuted, marginTop: spacing.lg, lineHeight: 18 },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});