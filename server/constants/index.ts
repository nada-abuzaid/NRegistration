export const APIS = {
    COUNTRIES: "https://api.countrystatecity.in/v1/countries",
    CITIES: (country: string) => `https://www.universal-tutorial.com/api/states/${country}`,
}