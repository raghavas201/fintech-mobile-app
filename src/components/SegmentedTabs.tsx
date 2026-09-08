import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

interface Props {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export default function SegmentedTabs({ options, selected, onSelect }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {options.map((opt) => {
          const active = opt === selected;
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => onSelect(opt)}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.pillBg,
    borderRadius: radius.pill,
    padding: 4,
  },
  row: { flexDirection: 'row' },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  tabActive: {
    backgroundColor: colors.white,
  },
  tabText: { ...typography.button, fontSize: 14, color: colors.textMuted },
  tabTextActive: { color: colors.primary },
});
