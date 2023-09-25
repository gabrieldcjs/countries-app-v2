const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/country-info', async (req, res) => {
  const countryName = req.query.name;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const countryData = response.data[0];

    const population = countryData.population;
    const capital = countryData.capital;
    const continents = countryData.continents;

    if (countryData.currencies && typeof countryData.currencies === 'object') {
      const currencyInfo = Object.values(countryData.currencies)
        .map((currency) => `${currency.name} (${currency.symbol})`)
        .join(', ');

      res.json({
        population,
        capital,
        continents,
        currencies: currencyInfo,
      });
    } else {
      res.json({
        population,
        capital,
        continents,
        currencies: 'Currency information not available',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
