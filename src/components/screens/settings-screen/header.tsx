import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '../../ui/box';
import { HStack } from '../../ui/h-stack';
import { Text } from '../../ui/text';

export default function Header() {
  return (
    <Box className="pt-5">
      <HStack className="gap-5 items-center">
        <Box className="size-16 rounded-[16px]">
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            className="w-full h-full flex justify-center items-center"
            style={{ borderRadius: 16 }}>
            <Ionicons name="settings-outline" size={28} color={'white'} />
          </LinearGradient>
        </Box>
        <Box>
          <Text size="3xl" className="font-inter-semibold">
            Settings
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
