export const MapboxImageLink = ({
  height = 1024,
  width = 1024,
  pins = [],
  style = "streets-v11",
  zoom = 13,
  attribution = "false",
}) => {
  const pin = [];
  pins.forEach((v) => {
    pin.push({
      icon: "pin-s-heart",
      color: "ff0000",
      ...v
    });
  });
  const url = new URL(`https://api.mapbox.com/styles/v1/mapbox/${style}/static${pin ? `/${pin.map((v, i) => `${v.icon}+${v.color}(${v.longitude},${v.latitude})`)}` : ""}/${pin.length > 1 ? "auto" : `${pin[0].longitude},${pin[0].latitude},${zoom},0`}/${width}x${height}@2x`);
  url.searchParams.append("access_token", "pk.eyJ1IjoiaWxvbW9uMTAiLCJhIjoiY2piZjh1cHVwMTRnbjJ3bzI1MWwwN2g3ZCJ9.txWBAfB2D7-vueg7G9FORA");
  url.searchParams.append("attribution", attribution);
  url.searchParams.append("logo", "false");
  if (pin.length > 1) url.searchParams.append("padding", "100");
  return url.toString();
}