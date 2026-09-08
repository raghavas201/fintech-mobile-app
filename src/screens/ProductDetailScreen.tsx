import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductDetail, useEMIPlans } from '../hooks/useProducts';
import VariantSelector from '../components/VariantSelector';
import EMIPlanCard from '../components/EMIPlanCard';
import CTAButton from '../components/CTAButton';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { ProductVariant, EMIPlan } from '../types/marketplace';
import { colors, spacing, typography } from '../theme/theme';

export default function ProductDetailScreen({ route, navigation }: any) {
  const { productId } = route.params;
  const productState = useProductDetail(productId);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);

  useEffect(() => {
    if (productState.status === 'success' && !selectedVariant) {
      const firstInStock = productState.data.variants.find((v) => v.inStock);
      setSelectedVariant(firstInStock ?? productState.data.variants[0]);
    }
  }, [productState.status]);

  const emiState = useEMIPlans(
    selectedVariant?.price ?? null,
    productState.status === 'success' ? productState.data.maxEmiTenureMonths : 24
  );

  if (productState.status === 'loading') return <Loader />;
  if (productState.status === 'error') {
    return <ErrorState message={productState.message} onRetry={productState.refetch} />;
  }

  const product = productState.data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>
            ₹{(selectedVariant?.price ?? product.basePrice).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.description}>{product.description}</Text>

          {product.specs?.length > 0 && (
            <View style={styles.specsBox}>
              <Text style={styles.sectionTitle}>Details</Text>
              {product.specs.map((spec: string, i: number) => (
                <View key={i} style={styles.specRow}>
                  <Text style={styles.specBullet}>•</Text>
                  <Text style={styles.specText}>{spec}</Text>
                </View>
              ))}
            </View>
          )}

          {selectedVariant && (
            <VariantSelector
              variants={product.variants}
              selectedId={selectedVariant.id}
              onSelect={(v) => {
                setSelectedVariant(v);
                setSelectedPlan(null);
              }}
            />
          )}

          <Text style={styles.sectionTitle}>Choose an EMI plan</Text>

          {emiState.status === 'loading' && <Loader />}
          {emiState.status === 'error' && (
            <ErrorState message={emiState.message} onRetry={emiState.refetch} />
          )}
          {emiState.status === 'success' &&
            emiState.data.map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                selected={selectedPlan?.id === plan.id}
                onSelect={() => setSelectedPlan(plan)}
              />
            ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CTAButton
          label={selectedPlan ? `Proceed · ₹${selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo` : 'Select an EMI plan'}
          disabled={!selectedPlan}
          onPress={() =>
            navigation.navigate('OrderSummary', {
              product,
              variant: selectedVariant,
              plan: selectedPlan,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  image: { width: '100%', height: 280, backgroundColor: colors.surface },
  content: { padding: spacing.md },
  brand: { ...typography.caption, color: colors.textMuted },
  name: { ...typography.h1, color: colors.text, marginTop: 2 },
  price: { ...typography.h2, color: colors.text, marginTop: spacing.sm },
  description: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  sectionTitle: { ...typography.h2, fontSize: 16, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  specsBox: { marginTop: spacing.md },
  specRow: { flexDirection: 'row', marginBottom: spacing.xs },
  specBullet: { ...typography.body, color: colors.primary, marginRight: spacing.sm },
  specText: { ...typography.body, color: colors.text, flex: 1 },
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});