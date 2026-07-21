export const calculateCO2Avoided = (energyKwh: number | undefined): number => {
  if (!energyKwh) return 0;

  const CO2_PER_KWH_GASOLINE = 2.31;
  const KM_PER_LITER = 10;
  const KWH_PER_100KM_EV = 15;

  const kmDriven = (energyKwh / KWH_PER_100KM_EV) * 100;
  const litersEquivalent = kmDriven / KM_PER_LITER;
  const co2Avoided = litersEquivalent * CO2_PER_KWH_GASOLINE;

  return Math.round(co2Avoided * 10) / 10;
};
