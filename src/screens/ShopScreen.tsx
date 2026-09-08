import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedTabs from '../components/SegmentedTabs';
import ListRowCard from '../components/ListRowCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { useProducts } from '../hooks/useProducts';
import { colors, radius, spacing, typography } from '../theme/theme';

const TABS = ['Top Brands', 'Nearby Stores', '1Fi Marketplace'];

export default function ShopScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState('Top Brands');
  const [query, setQuery] = useState('');
  const productsState = useProducts();

  const filteredProducts =
    productsState.status === 'success'
      ? productsState.data.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✦ NO-COST EMIs</Text>
        </View>
        <Text style={styles.heroTitle}>Shop today,</Text>
        <Text style={styles.heroTitleItalic}>Pay later using</Text>
        <Text style={styles.heroTitle}>Mutual funds.</Text>
        <Text style={styles.heroSubtitle}>
          No credit score required. No interest.{'\n'}Backed by your investments.
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <SegmentedTabs options={TABS} selected={activeTab} onSelect={setActiveTab} />

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeTab === '1Fi Marketplace' ? 'Search products...' : 'Search online stores...'
            }
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {activeTab === 'Top Brands' && <PlaceholderList label="Top Brands" />}

        {activeTab === 'Nearby Stores' && <PlaceholderList label="Nearby Stores" />}

        {activeTab === '1Fi Marketplace' && (
          <>
            {productsState.status === 'loading' && <Loader />}
            {productsState.status === 'error' && (
              <ErrorState message={productsState.message} onRetry={productsState.refetch} />
            )}
            {productsState.status === 'success' && (
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: spacing.xl }}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No products match "{query}"</Text>
                }
                renderItem={({ item }) => (
                  <ListRowCard
                    iconUrl={item.imageUrl}
                    title={item.name}
                    subtitle={`No-cost EMIs upto ${item.maxEmiTenureMonths} months`}
                    onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                  />
                )}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

function PlaceholderList({ label }: { label: string }) {
  return (
    <View style={styles.placeholderWrap}>
      <Text style={styles.placeholderText}>{label} — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + spacing.md,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  badgeText: { ...typography.caption, color: colors.white, fontWeight: '700' },
  heroTitle: { ...typography.h1, fontSize: 26, color: colors.white },
  heroTitleItalic: { ...typography.h1, fontSize: 26, color: colors.white, fontStyle: 'italic' },
  heroSubtitle: { ...typography.body, color: 'rgba(255,255,255,0.8)', marginTop: spacing.sm },
  body: {
    flex: 1,
    marginTop: -spacing.xl,
    paddingHorizontal: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    height: 46,
  },
  searchIcon: { color: colors.textMuted, marginRight: spacing.sm, fontSize: 16 },
  searchInput: { flex: 1, ...typography.body, color: colors.text },
  placeholderWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  placeholderText: { ...typography.body, color: colors.textMuted },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
