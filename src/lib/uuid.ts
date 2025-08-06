import uuid from 'react-native-uuid';

export const createUuid = () => {
  return uuid.v4() as string;
};
