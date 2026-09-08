import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

interface Props {
  iconUrl?: string;
  iconBg?: string;
  iconLetter?: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function ListRowCard({ iconUrl, iconBg, iconLetter, title, subtitle, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: iconBg ?? colors.pillBg }]}>
        {iconUrl ? (
          <Image source={{ uri: iconUrl }} style={styles.icon} resizeMode="cover" />
        ) : (
          <Text style={styles.iconLetter}>{iconLetter ?? title.charAt(0)}</Text>
        )}
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    // soft shadow to match the real app's card elevation
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: { width: '100%', height: '100%' },
  iconLetter: { ...typography.h2, color: colors.primary },
  textWrap: { flex: 1 },
  title: { ...typography.h2, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
});
