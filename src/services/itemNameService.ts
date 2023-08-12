import axios from "axios";

const itemNames: Map<string, any> = new Map();

export const init = async () => {
  await axios.get('itemNames.json')
  .then(res => {
      for (const nameData of res.data) {
        itemNames.set(nameData.UniqueName, nameData.LocalizedNames?.["EN-US"]);
      }      
  })
  .catch(err => console.log(err));
}

export const getEnglishName = (uniqueName: string): string => {  
  return itemNames.get(uniqueName);
}