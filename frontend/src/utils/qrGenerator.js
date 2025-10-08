import QRCode from 'qrcode';

export const generateQRCode = async (shortUrl) => {
  const shortUrlWithHost = `${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`;
  return await QRCode.toDataURL(shortUrlWithHost, {
    width: 400,
    margin: 2,
    errorCorrectionLevel: 'H',
  });
};
