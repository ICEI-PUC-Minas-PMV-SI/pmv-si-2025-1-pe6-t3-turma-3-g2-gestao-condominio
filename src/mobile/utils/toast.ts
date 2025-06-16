import Toast from 'react-native-toast-message';

export function showToast(type = 'success', text1: string, text2 = '') {
  Toast.show({
    type, // 'success' | 'error' | 'info'
    text1,
    text2,
    position: 'bottom',
    visibilityTime: 3000,
  });
}