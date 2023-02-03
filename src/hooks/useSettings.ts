import localforage from "localforage";
import { useEffect, useState } from "react";

export const store = localforage.createInstance({
  name: "Settings",
});

const useSettings = () => {
  const fonts: { [key: string]: string } = {
    satoshi: "font-satoshi",
    mono: "font-mono",
    serif: "font-serif",
    dancing: "font-dancing",
    sans: "font-sans",
  };

  const [font, setFont] = useState<string | null>(null);
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const setupData = async () => {
      const font = await store.getItem<string>("font");
      const darkMode = await store.getItem<boolean>("dark");

      setFont(font);
      setDark(darkMode);
    };

    setupData();
  }, []);

  return {
    fonts,
    font,
    dark,
  };
};

export default useSettings;
