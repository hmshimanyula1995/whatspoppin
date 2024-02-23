import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

/**
 * Custom hook to warm up the browser by preloading necessary resources.
 * It uses the `WebBrowser` API to warm up the browser and cool it down when the component unmounts.
 */
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
