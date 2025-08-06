import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '../../ui/v-stack';
import DangerZone from './danger-zone';
import Header from './header';
import Preferences from './preferences';
import ProgressStats from './progress-stats';

export default function SettingsScreen() {
  return (
    <SafeAreaView edges={{ top: 'maximum' }} className="flex-1 p-0 !pb-0 px-5">
      <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
        <VStack space="2xl" className="flex-1 pb-16">
          <Header />
          <ProgressStats />
          <Preferences />
          <DangerZone />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
