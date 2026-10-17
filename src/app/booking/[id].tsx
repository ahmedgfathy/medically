import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBookingDraft } from '../../context/BookingDraftContext';
import { DOCTORS } from '../../data/doctors';

type AppointmentDate = {
  label: string;
  value: string;
};

function getAppointmentDates(): AppointmentDate[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    return {
      label: date.toLocaleDateString('en', { weekday: 'short' }),
      value: date.toLocaleDateString('en', {
        day: 'numeric',
        month: 'short',
      }),
    };
  });
}

const APPOINTMENT_TIMES = ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM'];

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = DOCTORS.find((item) => item.id === id);
  const dates = useMemo(() => getAppointmentDates(), []);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const { setDraft } = useBookingDraft();

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

  const submitRequest = () => {
    if (!name.trim() || !phone.trim() || !selectedTime) {
      Alert.alert(
        'A few details are missing',
        'Add your name, phone number, and a preferred appointment time.',
      );
      return;
    }

    setDraft({
      doctorId: doctor.id,
      date: dates[selectedDate].value,
      time: selectedTime,
      name: name.trim(),
      phone: phone.trim(),
      reason: reason.trim(),
    });
    router.push('/booking/confirmation');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
          <Text style={styles.backLabel}>Appointment request</Text>
        </Pressable>

        <Text style={styles.title}>Choose a time</Text>
        <Text style={styles.subtitle}>
          Request an appointment with {doctor.name}.
        </Text>

        <Text style={styles.sectionTitle}>PREFERRED DATE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date, index) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: selectedDate === index }}
              key={date.value}
              onPress={() => setSelectedDate(index)}
              style={[
                styles.dateCard,
                selectedDate === index && styles.dateCardSelected,
              ]}
            >
              <Text
                style={[
                  styles.dateDay,
                  selectedDate === index && styles.selectedText,
                ]}
              >
                {date.label}
              </Text>
              <Text
                style={[
                  styles.dateValue,
                  selectedDate === index && styles.selectedText,
                ]}
              >
                {date.value}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>AVAILABLE TIMES</Text>
        <View style={styles.timeGrid}>
          {APPOINTMENT_TIMES.map((time) => {
            const selected = selectedTime === time;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={time}
                onPress={() => setSelectedTime(time)}
                style={[styles.timeCard, selected && styles.timeCardSelected]}
              >
                <Text style={[styles.timeText, selected && styles.selectedText]}>
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>YOUR DETAILS</Text>
        <Text style={styles.fieldLabel}>Full name</Text>
        <TextInput
          accessibilityLabel="Full name"
          autoCapitalize="words"
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#93A0A4"
          style={styles.input}
          value={name}
        />
        <Text style={styles.fieldLabel}>Phone number</Text>
        <TextInput
          accessibilityLabel="Phone number"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          placeholderTextColor="#93A0A4"
          style={styles.input}
          value={phone}
        />
        <Text style={styles.fieldLabel}>
          What would you like help with? (optional)
        </Text>
        <TextInput
          accessibilityLabel="Reason for visit"
          multiline
          onChangeText={setReason}
          placeholder="Share a short note for the clinic"
          placeholderTextColor="#93A0A4"
          style={[styles.input, styles.reasonInput]}
          textAlignVertical="top"
          value={reason}
        />
        <Text style={styles.demoNotice}>
          Demo only · this request will not be sent to a clinic.
        </Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.feeCaption}>CONSULTATION</Text>
          <Text style={styles.fee}>${doctor.consultationFee}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={submitRequest}
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.submitButtonText}>Review request</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8F8',
    flex: 1,
  },
  content: {
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 18,
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
  title: {
    color: '#18343C',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: '#718187',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  sectionTitle: {
    color: '#819197',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 11,
    marginTop: 24,
  },
  dateCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4EBED',
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 9,
    minWidth: 66,
    paddingHorizontal: 11,
    paddingVertical: 12,
  },
  dateCardSelected: {
    backgroundColor: '#177F72',
    borderColor: '#177F72',
  },
  dateDay: {
    color: '#74868C',
    fontSize: 11,
    fontWeight: '600',
  },
  dateValue: {
    color: '#1D3D45',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  timeCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4EBED',
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 45,
    justifyContent: 'center',
    width: '48%',
  },
  timeCardSelected: {
    backgroundColor: '#177F72',
    borderColor: '#177F72',
  },
  timeText: {
    color: '#536A71',
    fontSize: 13,
    fontWeight: '600',
  },
  fieldLabel: {
    color: '#445C63',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4EBED',
    borderRadius: 12,
    borderWidth: 1,
    color: '#233C43',
    fontSize: 14,
    minHeight: 48,
    paddingHorizontal: 13,
  },
  reasonInput: {
    minHeight: 84,
    paddingTop: 12,
  },
  demoNotice: {
    color: '#8A7446',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 18,
    textAlign: 'center',
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
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#177F72',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 22,
  },
  submitButtonText: {
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
