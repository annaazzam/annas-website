export type ImageCollection = {
  photos: any[];
  thumbnails: any[];
  displayName: string;
  folderName: string;
  date: string;
};

const images = new Map<string, ImageCollection>();

// Images in the folder should be named 1.jpg, 2.jpg ... etc.
// Run this script to get set up: `ls -v | cat -n | while read n f; do mv -n "$f" "$n.jpg"; done`
const collections = [
  {
    folderName: 'laperouse',
    displayName: 'La Perouse Beach',
    numImages: 10,
    date: 'January, 2021',
  },
  {
    folderName: 'malabar',
    displayName: 'Malabar Headland National Park',
    numImages: 17,
    date: 'July, 2020',
  },
  {
    folderName: 'graduation',
    displayName: 'My Graduation',
    numImages: 15,
    date: 'March, 2019'
  },
  {
    folderName: 'weddingparty',
    displayName: "Carol and Nathan's Wedding Party",
    numImages: 56,
    date: 'March, 2019'
  },
  {
    folderName: 'europe',
    displayName: 'Paris & Venice',
    numImages: 36,
    date: 'July, 2018'
  },
  {
    folderName: 'seattle',
    displayName: 'Seattle',
    numImages: 46,
    date: 'February, 2018'
  },
  {
    folderName: 'atlantachristmas',
    displayName: 'Christmas in Atlanta',
    numImages: 32,
    date: 'December, 2017'
  },
];

collections.forEach(({
  folderName,
  displayName,
  numImages,
  date,
}) => {
  images.set(folderName, {
    photos: [
      ...Array(numImages)
        .fill(0)
        .map((_, i) => {
          return require(`./photos/${folderName}/${i + 1}.jpg`);
        }),
    ],
    // Use https://bulkresizephotos.com/ to get compressed thumbnails
    thumbnails: [
      ...Array(numImages)
        .fill(0)
        .map((_, i) => {
          return require(`./photos/${folderName}/thumbnails/${i + 1}.jpg`);
        }),
    ],
    displayName,
    folderName,
    date,
  });
});

export default images;
