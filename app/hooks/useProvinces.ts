const data = [
    {
      "value": "Ahvenanmaa",
      "label": "Ahvenanmaa",
      "english": "Åland",
      "latlng": [60.116667, 19.9]
    },
    {
      "value": "Etelä-Karjala",
      "label": "Etelä-Karjala",
      "english": "South Karelia",
      "latlng": [61.183333, 28.766667]
    },
    {
      "value": "Etelä-Pohjanmaa",
      "label": "Etelä-Pohjanmaa",
      "english": "South Ostrobothnia",
      "latlng": [62.791667, 22.841667]
    },
    {
      "value": "Etelä-Savo",
      "label": "Etelä-Savo",
      "english": "South Savo",
      "latlng": [61.683333, 27.266667]
    },
    {
      "value": "Kainuu",
      "label": "Kainuu",
      "english": "Kainuu",
      "latlng": [64.225, 27.733333]
    },
    {
      "value": "Kanta-Häme",
      "label": "Kanta-Häme",
      "english": "Kanta-Häme",
      "latlng": [60.994444, 24.466667]
    },
    {
      "value": "Keski-Pohjanmaa",
      "label": "Keski-Pohjanmaa",
      "english": "Central Ostrobothnia",
      "latlng": [63.836667, 23.133333]
    },
    {
      "value": "Keski-Suomi",
      "label": "Keski-Suomi",
      "english": "Central Finland",
      "latlng": [62.241667, 25.741667]
    },
    {
      "value": "Kymenlaakso",
      "label": "Kymenlaakso",
      "english": "Kymenlaakso",
      "latlng": [60.868056, 26.704167]
    },
    {
      "value": "Lappi",
      "label": "Lappi",
      "english": "Lapland",
      "latlng": [66.5, 25.733333]
    },
    {
      "value": "Pirkanmaa",
      "label": "Pirkanmaa",
      "english": "Pirkanmaa",
      "latlng": [61.498056, 23.76]
    },
    {
      "value": "Pohjanmaa",
      "label": "Pohjanmaa",
      "english": "Ostrobothnia",
      "latlng": [63.1, 21.616667]
    },
    {
      "value": "Pohjois-Karjala",
      "label": "Pohjois-Karjala",
      "english": "North Karelia",
      "latlng": [62.6, 29.75]
    },
    {
      "value": "Pohjois-Pohjanmaa",
      "label": "Pohjois-Pohjanmaa",
      "english": "North Ostrobothnia",
      "latlng": [65.014167, 25.471944]
    },
    {
      "value": "Pohjois-Savo",
      "label": "Pohjois-Savo",
      "english": "North Savo",
      "latlng": [62.8925, 27.678333]
    },
    {
      "value": "Päijät-Häme",
      "label": "Päijät-Häme",
      "english": "Päijät-Häme",
      "latlng": [60.983333, 25.65]
    },
    {
      "value": "Satakunta",
      "label": "Satakunta",
      "english": "Satakunta",
      "latlng": [61.483333, 21.8]
    },
    {
      "value": "Uusimaa",
      "label": "Uusimaa",
      "english": "Uusimaa",
      "latlng": [60.170833, 24.9375]
    },
    {
      "value": "Varsinais-Suomi",
      "label": "Varsinais-Suomi",
      "english": "Southwest Finland",
      "latlng": [60.45, 22.266667]
    }
  ]


const useProvinces = () => {
  const getAll = () => data;

  const getByValue = (value: string) => {
    return data.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useProvinces;
