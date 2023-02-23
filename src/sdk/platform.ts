import { Platform } from './types';

export type PlatformOptions = {

}

export const platform = (name: string, options: PlatformOptions): Platform => {
  return {
    name,
    auth: {
      
    }
  }
};
