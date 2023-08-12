import axios from "axios";

export interface IPricePoint {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number
  sell_price_min_date: Date;
  sell_price_max: number;
  sell_price_max_date: Date;
  buy_price_min: number;
  buy_price_min_date: Date;
  buy_price_max: number;
  buy_price_max_date: Date;
}

// pricePoint.item_id + ':' + pricePoint.city + ':' + pricePoint.quality

export const pricePoints: Map<string, IPricePoint> = new Map();

export const run = async () => {
  const names = await getAllItemNames();

  //console.log(names);

  setInterval(() => addPricePoints(names), 1500)
}

let nameCounter = 0;

const addPricePoints = (names: string[]) => {
  if (nameCounter >= names.length) {
    nameCounter = 0;
  }

  let batchCharacters = 0;
  const characterLimit = 3923; //4096 - 56 - 117
  const batch: string[] = [];

  for (; nameCounter < names.length; nameCounter++) {
    if (batchCharacters + names[nameCounter].length > characterLimit) {
      break;
    }

    batchCharacters += names[nameCounter].length + 1;
    batch.push(names[nameCounter]);
  }

  addPricePointBatch(String(batch));
}

const addPricePointBatch = async (itemNames: string) => {
  console.log('requesting', itemNames.length);
  // return;

  try {
    const { data, status } = await axios.get<IPricePoint[]>(
      `https://west.albion-online-data.com/api/v2/stats/Prices/${itemNames}.json?locations=Caerleon%2CBridgewatch%2CLymhurst%2CThetford%2CMartlock%2CFort%20Sterling&qualities=1%2C2%2C3%2C4%2C5`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let added = 0;

    for (const pricePoint of data) {
      pricePoints.set(pricePoint.item_id + ':' + pricePoint.city + ':' + pricePoint.quality, pricePoint);
      added++
    }

    // console.log('Added ' + added + ' pricepoints');
    
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

const getAllItemNames = async (): Promise<string[]> => {
  const listOfNames: string[] = [];

  await axios.get('itemNames.json')
    .then(res => {
      for (const eachObject of res.data) {
        listOfNames.push(eachObject.UniqueName);
      }
    })
    .catch(err => console.log(err));

  return listOfNames;
}

export const getItemPrice = (uniqueName: string, city: string): [number, IPricePoint[]] => {
  //console.log('calling item price', uniqueName);

  const pricePoint1 = pricePoints.get(uniqueName + ':' + city + ':' + 1);
  const pricePoint2 = pricePoints.get(uniqueName + ':' + city + ':' + 2);
  const pricePoint3 = pricePoints.get(uniqueName + ':' + city + ':' + 3);
  const pricePoint4 = pricePoints.get(uniqueName + ':' + city + ':' + 4);
  const pricePoint5 = pricePoints.get(uniqueName + ':' + city + ':' + 5);

  const validPricePoints: IPricePoint[] = [];
  //console.log(pricePoint1);

  if (pricePoint1?.sell_price_min ?? 0 !== 0) {
    validPricePoints.push(pricePoint1!);
  }
  if (pricePoint2?.sell_price_min ?? 0 !== 0) {
    validPricePoints.push(pricePoint2!);
  }
  if (pricePoint3?.sell_price_min ?? 0 !== 0) {
    validPricePoints.push(pricePoint3!);
  }
  if (pricePoint4?.sell_price_min ?? 0 !== 0) {
    validPricePoints.push(pricePoint4!);
  }
  if (pricePoint5?.sell_price_min ?? 0 !== 0) {
    validPricePoints.push(pricePoint5!);
  }

  //console.log(validPricePoints);

  if (validPricePoints.length === 0) {
    return [0, []];
  }

  const lowestPrice = validPricePoints.reduce((min, p) => p.sell_price_min < min ? p.sell_price_min : min, validPricePoints[0].sell_price_min);

  return [lowestPrice, validPricePoints];
}
