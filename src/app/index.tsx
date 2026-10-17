import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DoctorCard } from '../components/DoctorCard';
import { DOCTORS, REGIONS, SPECIALTIES } from '../data/doctors';
import { distanceInMeters } from '../lib/distance';

type UserLocation = {
  latitude: number;
  longitude: number;
};

export default function HomeScreen() {
  const [region, setRegion] = useState('All areas');
  const [specialty, setSpecialty] = useState('All specialties');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const doctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return DOCTORS.filter((doctor) => {
      const matchesRegion = region === 'All areas' || doctor.region === region;
      const matchesSpecialty =
        specialty === 'All specialties' || doctor.specialty === specialty;
      const matchesSearch =
        query.length === 0 ||
        `${doctor.name} ${doctor.specialty} ${doctor.address}`
          .toLowerCase()
          .includes(query);

      return matchesRegion && matchesSpecialty && matchesSearch;
    }).sort((first, second) => {
      if (!location) {
        return 0;
      }

      return (
        distanceInMeters(location, first) - distanceInMeters(location, second)
      );
    });
  }, [location, region, search, specialty]);

  const findMyLocation = async () => {
    setLoadingLocation(true);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Location permission needed',
          'Allow location access to see approximate distances to clinics.',
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unknown location error.';
      Alert.alert(
        'Could not get your location',
        `Check that location services are enabled, then try again. ${message}`,
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.brand}>medically</Text>
          <Text style={styles.eyebrow}>CARE, CLOSER TO YOU</Text>
          <Text style={styles.title}>Find the right doctor.</Text>
          <Text style={styles.subtitle}>
            Browse trusted care around your neighborhood.
          </Text>

          <Pressable
            accessibilityRole="button"
            disabled={loadingLocation}
            onPress={findMyLocation}
            style={({ pressed }) => [
              styles.locationButton,
              pressed && styles.pressed,
            ]}
          >
            {loadingLocation ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.locationDot} />
            )}
            <Text style={styles.locationButtonText}>
              {loadingLocation
                ? 'Finding your location...'
                : location
                  ? 'Location enabled · update'
                  : 'Use my location'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          <View style={styles.demoNotice}>
            <Text style={styles.demoNoticeText}>
              Demo directory · doctor details and distances are sample data.
            </Text>
          </View>

          <View style={styles.searchBox}>
            <Text style={styles.searchMark}>⌕</Text>
            <TextInput
              accessibilityLabel="Search doctors or clinics"
              onChangeText={setSearch}
              placeholder="Doctor, specialty or clinic"
              placeholderTextColor="#91A0A5"
              returnKeyType="search"
              style={styles.searchInput}
              value={search}
            />
          </View>

          <Text style={styles.sectionLabel}>CHOOSE AN AREA</Text>
          <ScrollView
            contentContainerStyle={styles.chipRow}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {REGIONS.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={region === item}
                onPress={() => setRegion(item)}
              />
            ))}
          </ScrollView>

          <Text style={[styles.sectionLabel, styles.specialtyLabel]}>
            SPECIALTY
          </Text>
          <ScrollView
            contentContainerStyle={styles.chipRow}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {SPECIALTIES.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={specialty === item}
                onPress={() => setSpecialty(item)}
              />
            ))}
          </ScrollView>

          <View style={styles.resultsHeading}>
            <View>
              <Text style={styles.resultsTitle}>Available doctors</Text>
              <Text style={styles.resultsCount}>
                {doctors.length}{' '}
                {doctors.length === 1 ? 'doctor' : 'doctors'} to explore
              </Text>
            </View>
            {location && <Text style={styles.nearbyLabel}>NEAREST FIRST</Text>}
          </View>

          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                distance={
                  location ? distanceInMeters(location, doctor) : undefined
                }
                onPress={() =>
                  router.push({
                    pathname: '/doctor/[id]',
                    params: { id: doctor.id },
                  })
                }
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No doctors found</Text>
              <Text style={styles.emptyText}>
                Try another area, specialty, or search.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setRegion('All areas');
                  setSpecialty('All specialties');
                  setSearch('');
                }}
              >
                <Text style={styles.resetText}>Clear filters</Text>
              </Pressable>
            </View>
          )}
          <Text style={styles.footer}>
            Care starts with the right connection.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F5F8F8',
    flex: 1,
  },
  content: {
    backgroundColor: '#F5F8F8',
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#E8F5F1',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 25,
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  brand: {
    color: '#167E71',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  eyebrow: {
    color: '#56877D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.6,
    marginTop: 24,
  },
  title: {
    color: '#18343C',
    fontSize: 29,
    fontWeight: '800',
    letterSpacing: -1,
    marginTop: 7,
  },
  subtitle: {
    color: '#617A80',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  locationButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#177F72',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 18,
    minHeight: 42,
    paddingHorizontal: 14,
  },
  locationDot: {
    backgroundColor: '#A8F1CC',
    borderRadius: 4,
    height: 8,
    marginRight: 9,
    width: 8,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
  body: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  demoNotice: {
    backgroundColor: '#FFF8E8',
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  demoNoticeText: {
    color: '#806A3D',
    fontSize: 11,
    lineHeight: 16,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E7ECEE',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 14,
  },
  searchMark: {
    color: '#75918D',
    fontSize: 25,
    lineHeight: 28,
    marginRight: 8,
  },
  searchInput: {
    color: '#233C43',
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  sectionLabel: {
    color: '#819197',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 9,
    marginTop: 20,
  },
  specialtyLabel: {
    marginTop: 16,
  },
  chipRow: {
    paddingRight: 10,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5EBED',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: '#177F72',
    borderColor: '#177F72',
  },
  chipText: {
    color: '#60737A',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  resultsHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 25,
  },
  resultsTitle: {
    color: '#1A3740',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  resultsCount: {
    color: '#7C8D92',
    fontSize: 12,
    marginTop: 4,
  },
  nearbyLabel: {
    color: '#358A73',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  emptyTitle: {
    color: '#1A3740',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: '#718187',
    fontSize: 13,
    marginTop: 7,
    textAlign: 'center',
  },
  resetText: {
    color: '#177F72',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 15,
  },
  footer: {
    color: '#94A1A5',
    fontSize: 11,
    paddingBottom: 26,
    paddingTop: 10,
    textAlign: 'center',
  },
});
