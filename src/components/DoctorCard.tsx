import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Doctor } from '../data/doctors';
import { formatDistance } from '../lib/distance';

type DoctorCardProps = {
  doctor: Doctor;
  distance?: number;
  onPress: () => void;
};

export function DoctorCard({ doctor, distance, onPress }: DoctorCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${doctor.name}, ${doctor.specialty}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <View style={[styles.avatar, { backgroundColor: doctor.color }]}>
          <Text style={styles.initials}>{doctor.initials}</Text>
        </View>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>{doctor.rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <View style={styles.greenDot} />
        <Text style={styles.address} numberOfLines={1}>
          {doctor.address}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {distance === undefined
            ? 'Turn on location for distance'
            : `Sample distance · ${formatDistance(distance)}`}
        </Text>
        <Text style={styles.fee}>${doctor.consultationFee} / visit</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEF2',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  pressed: {
    opacity: 0.82,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 17,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  initials: {
    color: '#173B45',
    fontSize: 16,
    fontWeight: '700',
  },
  nameBlock: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: '#17323B',
    fontSize: 15,
    fontWeight: '700',
  },
  specialty: {
    color: '#6E8189',
    fontSize: 13,
    marginTop: 4,
  },
  rating: {
    alignItems: 'center',
    backgroundColor: '#FFF7E7',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  star: {
    color: '#D99A29',
    fontSize: 13,
    marginRight: 4,
  },
  ratingText: {
    color: '#5D4A25',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    backgroundColor: '#EEF2F4',
    height: 1,
    marginVertical: 14,
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  greenDot: {
    backgroundColor: '#45B88A',
    borderRadius: 4,
    height: 8,
    marginRight: 8,
    width: 8,
  },
  address: {
    color: '#455C65',
    flex: 1,
    fontSize: 12,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  meta: {
    color: '#829198',
    flex: 1,
    fontSize: 11,
  },
  fee: {
    color: '#177F72',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
});
