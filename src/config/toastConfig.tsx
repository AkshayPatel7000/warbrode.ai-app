import React from 'react';
import { View, Text } from 'react-native';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react-native';

/**
 * Custom Toast Configuration
 * Provides premium-styled toast notifications matching the app's design system
 */
export const toastConfig = {
  /*
    Success Toast
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#a3e635',
        borderLeftWidth: 6,
        backgroundColor: '#ffffff',
        height: 70,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#64748b',
        lineHeight: 20,
      }}
      renderLeadingIcon={() => (
        <View style={{ justifyContent: 'center', paddingLeft: 16 }}>
          <CheckCircle size={24} color="#a3e635" strokeWidth={2.5} />
        </View>
      )}
    />
  ),

  /*
    Error Toast
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ef4444',
        borderLeftWidth: 6,
        backgroundColor: '#ffffff',
        height: 70,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#64748b',
        lineHeight: 20,
      }}
      renderLeadingIcon={() => (
        <View style={{ justifyContent: 'center', paddingLeft: 16 }}>
          <XCircle size={24} color="#ef4444" strokeWidth={2.5} />
        </View>
      )}
    />
  ),

  /*
    Info Toast
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: '#3b82f6',
        borderLeftWidth: 6,
        backgroundColor: '#ffffff',
        height: 70,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#64748b',
        lineHeight: 20,
      }}
      renderLeadingIcon={() => (
        <View style={{ justifyContent: 'center', paddingLeft: 16 }}>
          <Info size={24} color="#3b82f6" strokeWidth={2.5} />
        </View>
      )}
    />
  ),

  /*
    Warning Toast
  */
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#f59e0b',
        borderLeftWidth: 6,
        backgroundColor: '#ffffff',
        height: 70,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#64748b',
        lineHeight: 20,
      }}
      renderLeadingIcon={() => (
        <View style={{ justifyContent: 'center', paddingLeft: 16 }}>
          <AlertCircle size={24} color="#f59e0b" strokeWidth={2.5} />
        </View>
      )}
    />
  ),
};
