import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBookingDraft } from '../../context/BookingDraftContext';
import { DOCTORS } from '../../data/doctors';

export default function BookingConfirmationScreen() {
  const { draft, clearDraft } = useBookingDraft();
  const doctor = DOCTORS.find((item) => item.id === draft?.doctorId);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Text style={styles.check}>✓</Text>
        </View>
        <Text style={styles.eyebrow}>REVIEW YOUR APPOINTMENT</Text>
        <Text style={styles.title}>
          {draft ? `Thanks, ${draft.name}.` : 'Appointment details'}
        </Text>
        <Text style={styles.subtitle}>
          Check the details below before contacting the clinic.
        </Text>

        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>DOCTOR</Text>
          <Text style={styles.summaryValue}>{doctor?.name ?? 'Doctor'}</Text>
          <View style={styles.divider} />
          <Text style={styles.summaryLabel}>PREFERRED APPOINTMENT</Text>
          <Text style={styles.summaryValue}>
            {draft ? `${draft.date} · ${draft.time}` : 'No appointment selected'}
          </Text>
          {draft && (
            <>
              <View style={styles.divider} />
              <Text style={styles.summaryLabel}>CONTACT</Text>
              <Text style={styles.summaryValue}>{draft.name}</Text>
              <Text style={styles.summarySecondary}>{draft.phone}</Text>
            </>
          )}
          {draft?.reason ? (
            <>
              <View style={styles.divider} />
              <Text style={styles.summaryLabel}>NOTE FOR THE CLINIC</Text>
              <Text style={styles.summaryValue}>{draft.reason}</Text>
            </>
          ) : null}
          {doctor && (
            <>
              <View style={styles.divider} />
              <Text style={styles.summaryLabel}>CONSULTATION FEE</Text>
              <Text style={styles.summaryValue}>
                ${doctor.consultationFee}
              </Text>
            </>
          )}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Demo only</Text>
          <Text style={styles.noticeText}>
            This request has not been sent and your appointment is not
            confirmed. A booking service will be connected in a later step.
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        {draft && (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.editButtonText}>Edit details</Text>
          </Pressable>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            clearDraft();
            router.replace('/');
          }}
          style={({ pressed }) => [
            styles.homeButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.homeButtonText}>Back to doctors</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8F8',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 22,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  content: {
    alignItems: 'center',
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: '#DFF3E9',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  check: {
    color: '#198465',
    fontSize: 34,
    fontWeight: '700',
  },
  eyebrow: {
    color: '#4C8B78',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginTop: 22,
  },
  title: {
    color: '#18343C',
    fontSize: 27,
    fontWeight: '800',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#718187',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    textAlign: 'center',
  },
  summary: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6ECEE',
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 28,
    padding: 17,
  },
  summaryLabel: {
    color: '#839297',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  summaryValue: {
    color: '#25434A',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  summarySecondary: {
    color: '#718187',
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    backgroundColor: '#EEF2F3',
    height: 1,
    marginVertical: 14,
  },
  notice: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF8E8',
    borderRadius: 13,
    marginTop: 14,
    padding: 14,
  },
  noticeTitle: {
    color: '#806A3D',
    fontSize: 12,
    fontWeight: '800',
  },
  noticeText: {
    color: '#806A3D',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  actions: {
    gap: 10,
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: '#E7F3EF',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 52,
  },
  editButtonText: {
    color: '#177F72',
    fontSize: 15,
    fontWeight: '700',
  },
  homeButton: {
    alignItems: 'center',
    backgroundColor: '#177F72',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 52,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
