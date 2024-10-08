// src/paypal.d.ts
declare global {
  interface Window {
    paypal: {
      Buttons: (options: any) => {
        render: (containerId: string) => void;
      };
    };
  }
}

export {};
