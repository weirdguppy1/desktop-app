import { safeStorage } from "electron";

const useCrypto = () => {
  const encrypt = (text: string) => {
    safeStorage.encryptString(text);
  };

  const decrypt = (buff: Buffer) => {
    safeStorage.decryptString(buff);
  };

  const isSame = () => {};
};

export default useCrypto;
