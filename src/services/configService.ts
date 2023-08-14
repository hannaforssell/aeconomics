export const allCategories: string[] = ["other","farmables","products","materials","luxurygoods","token","resources","artefacts","cityresources","consumables","skillbooks","offhand","accessories","armor","gatherergear","melee","tools","ranged","magic","mounts","furniture","trophies","labourers"].sort((a, b) => a.localeCompare(b));
export const categoriesToShow = new Set<string>(allCategories);
categoriesToShow.delete('artefacts');
categoriesToShow.delete('token');
categoriesToShow.delete('other');

export const allCities: string[] = ["Caerleon","Bridgewatch","Lymhurst","Thetford","Martlock","Fort Sterling"].sort((a, b) => a.localeCompare(b));
export const citiesToShow = new Set<string>(allCities);
