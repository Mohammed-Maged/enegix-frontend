export const decodeBase64 = (base64: string): Uint8Array =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

export const decryptWithDynamicKey = async (
  d: string,
  n: string,
  t: string
): Promise<any> => {
  try {
    const fullDecoded = decodeBase64(d);
    const keyBytes = fullDecoded.slice(0, 16);
    const encryptedPayload = fullDecoded.slice(16);

    const nonce = decodeBase64(n);
    const authTag = decodeBase64(t);

    const ciphertextWithTag = new Uint8Array(
      encryptedPayload.length + authTag.length
    );
    ciphertextWithTag.set(encryptedPayload);
    ciphertextWithTag.set(authTag, encryptedPayload.length);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      "AES-GCM",
      false,
      ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: nonce,
      },
      cryptoKey,
      ciphertextWithTag
    );

    const json = new TextDecoder().decode(decrypted);
    return JSON.parse(json);
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};
