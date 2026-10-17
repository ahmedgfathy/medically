import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DOCTORS } from '../../data/doctors';

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = DOCTORS.find((item) => item.id === id);

  if (!doctor) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>Doctor not found</Text>
        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.backLink}>Back to doctors</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
          <Text style={styles.backLabel}>Doctor profile</Text>
        </Pressable>

        <View style={styles.profileCard}>
          <View style={[styles.avatar, { backgroundColor: doctor.color }]}>
            <Text style={styles.initials}>{doctor.initials}</Text>
          </View>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.ratingPill}>
            <Text style={styles.rating}>★ {doctor.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>
              · {doctor.reviewCount} reviews
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat value={`${doctor.experience} yrs`} label="Experience" />
          <View style={styles.statDivider} />
          <Stat value={`${doctor.region} area`} label="Location" />
          <View style={styles.statDivider} />
          <Stat value={`$${doctor.consultationFee}`} label="Per visit" />
        </View>

        <Section title="About">
          <Text style={styles.bodyText}>{doctor.bio}</Text>
        </Section>

        <Section title="Clinic address">
          <View style={styles.addressRow}>
            <View style={styles.addressPin}>
              <View style={styles.greenDot} />
            </View>
            <View style={styles.addressCopy}>
              <Text style={styles.address}>{doctor.address}</Text>
              <Text style={styles.sampleHint}>Sample clinic location</Text>
            </View>
          </View>
        </Section>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Demo profile · availability and clinic details are sample content.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.feeCaption}>CONSULTATION</Text>
          <Text style={styles.fee}>${doctor.consultationFee}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: '/booking/[id]',
              params: { id: doctor.id },
            })
          }
          style={({ pressed }) => [
            styles.bookButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.bookButtonText}>Book an appointment</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8F8',
    flex: 1,
  },
  content: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 18,
    minHeight: 40,
  },
  backButtonText: {
    color: '#177F72',
    fontSize: 32,
    lineHeight: 34,
    marginRight: 8,
  },
  backLabel: {
    color: '#597078',
    fontSize: 14,
    fontWeight: '600',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEF0',
    borderRadius: 22,
    borderWidth: 1,
    paddingBottom: 23,
    paddingTop: 24,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 28,
    height: 82,
    justifyContent: 'center',
    width: 82,
  },
  initials: {
    color: '#173B45',
    fontSize: 24,
    fontWeight: '800',
  },
  name: {
    color: '#18343C',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 15,
  },
  specialty: {
    color: '#648078',
    fontSize: 14,
    marginTop: 5,
  },
  ratingPill: {
    alignItems: 'center',
    backgroundColor: '#FFF7E7',
    borderRadius: 14,
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  rating: {
    color: '#886524',
    fontSize: 12,
    fontWeight: '700',
  },
  reviewCount: {
    color: '#8C8067',
    fontSize: 12,
    marginLeft: 4,
  },
  statsRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEF0',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
    paddingVertical: 16,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#1A4850',
    fontSize: 13,
    fontWeight: '700',
  },
  statLabel: {
    color: '#819096',
    fontSize: 10,
    marginTop: 5,
  },
  statDivider: {
    backgroundColor: '#E9EFF0',
    height: 30,
    width: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#193940',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  bodyText: {
    color: '#667A80',
    fontSize: 14,
    lineHeight: 22,
  },
  addressRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEF0',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 14,
  },
  addressPin: {
    alignItems: 'center',
    backgroundColor: '#E9F6F0',
    borderRadius: 12,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  greenDot: {
    backgroundColor: '#45B88A',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  addressCopy: {
    flex: 1,
    marginLeft: 12,
  },
  address: {
    color: '#334D55',
    fontSize: 13,
    fontWeight: '600',
  },
  sampleHint: {
    color: '#87969A',
    fontSize: 11,
    marginTop: 4,
  },
  notice: {
    backgroundColor: '#FFF8E8',
    borderRadius: 11,
    marginTop: 20,
    padding: 12,
  },
  noticeText: {
    color: '#806A3D',
    fontSize: 11,
    lineHeight: 16,
  },
  bottomBar: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E6ECEE',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 18,
    paddingHorizontal: 20,
    paddingTop: 13,
  },
  feeCaption: {
    color: '#87969A',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  fee: {
    color: '#1A4850',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 3,
  },
  bookButton: {
    alignItems: 'center',
    backgroundColor: '#177F72',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
  notFound: {
    alignItems: 'center',
    backgroundColor: '#F5F8F8',
    flex: 1,
    justifyContent: 'center',
  },
  notFoundTitle: {
    color: '#18343C',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  backLink: {
    color: '#177F72',
    fontSize: 14,
    fontWeight: '700',
  },
});
