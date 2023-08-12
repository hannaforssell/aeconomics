import axios from "axios";

const getRawItems = async () => {
  try {
    const { data } = await axios.get(
      `https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/items.json`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data.items;
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

const convertRawItems = async () => {
  const rawItems = await getRawItems();

  const items: any = [];

  const asArray = Object.entries(rawItems);

  for (let i = 3; i < asArray.length; i++) {
    items.push(asArray[i][1])
  }
  return items.flat();
}

const addItemsToFile = async () => {
  const items = await convertRawItems();

  downloadFile(makeTextFile(JSON.stringify(items)));
}

const downloadFile = (filePath: string) => {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = 'items.json';
  link.click();
}

let textFile: any = null;
const makeTextFile = function (text: string) {
  const data = new Blob([text], {type: 'text/plain'});

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  // returns a URL you can use as a href
  return textFile;
};

//addItemsToFile();