import { CarProps } from "@/types";

export async function fetchCars() {
  const headers = {
    "x-rapidapi-key": "f30c0e356bmsh75475d0dad8f9e2p1c9461jsnf3b0795557a7",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla`,
    {
      headers: headers,
    },
  );

  const res = await response.json();
  const result = res.map((car: CarProps) => ({
    ...car,
    city_mpg: typeof car.city_mpg === "number" ? car.city_mpg : 25,

    combination_mpg:
      typeof car.combination_mpg === "number" ? car.combination_mpg : 28,

    highway_mpg: typeof car.highway_mpg === "number" ? car.highway_mpg : 32,
  }));
  return result;
}

export const calculateCarRent = (city_mpg: string | number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mpg = typeof city_mpg === "number" ? city_mpg : 25;

  const mileageRate = mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
