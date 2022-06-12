import React from "react";
import { inbuimentProducts } from "../../data/inbuimentProducts";
import { CurrencyUtil } from "../../utils/currency.util";

const Imbuiments = () => {
  const [inbuimentProductsFiltered, setInbuimentProductsFiltered] =
    React.useState(inbuimentProducts);
  const [filter, setFilter] = React.useState("");
  const handleFilter = () => {
    const filtered = inbuimentProducts.filter((product: any) => {
      return product.name.toLowerCase().includes(filter.toLowerCase());
    });
    setInbuimentProductsFiltered(filtered);
  };
  const handleChange = (e: any) => {
    setFilter(e.target.value);
    setCalculated(false);
  };
  const inbuiments = [...new Set(inbuimentProducts.map((i) => i.inbue))];
  const [cI, setCalculetedInbuiments] = React.useState({} as any);
  const [calculated, setCalculated] = React.useState(false);
  const calculateInbuiments = (lvl: number) => {
    return () => {
      setCalculetedInbuiments(
        inbuimentProducts.reduce((acc: any, curr: any) => {
          if (curr.inbuimentLevel > lvl) {
            return acc;
          }
          if (!acc[curr.inbue]) {
            acc[curr.inbue] = [0, 0];
          }
          //console.log(`adding to ${curr.inbue} from level`, curr.inbuimentLevel)
          acc[curr.inbue][0] += curr.priceInMarket[0] * curr.qty;
          acc[curr.inbue][1] += curr.priceInMarket[1] * curr.qty;
          return acc;
        }, {})
      );
      setCalculated(true);
    };
  };

  const c = CurrencyUtil.convertToCurrency;

  return (
    <>
      <>
        <h1>Inbuiment Costs</h1>
        <button onClick={calculateInbuiments(1)}>Basic</button>
        <button onClick={calculateInbuiments(2)}>Intrincate</button>
        <button onClick={calculateInbuiments(3)}>Powerful</button>
        {calculated && (
          <table>
            <thead>
              <tr>
                <th>Inbuiment</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
              </tr>
            </thead>
            <tbody>
              {inbuiments.map((i) => {
                return (
                  <tr key={i}>
                    <td>
                      <b>{i}</b>
                    </td>
                    <td>{c(cI[i][0]) || `??`}</td>
                    <td>{c(cI[i][1]) || `??`}</td>
                    <td>
                      {c(
                        (cI[i] as number[]).reduce(
                          (a, b) => ((a || b) + (b || a)) / 2,
                          0
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
      <>
        <h1>Imbuiment Products</h1>
        <input
          value={filter}
          onChange={handleChange}
          type="text"
          placeholder="Search"
        />
        <button onClick={handleFilter}>Search</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price Min</th>
              <th>Price Max</th>
              <th>Extra</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {inbuimentProductsFiltered.map((i) => (
              <tr key={i.name}>
                <td>
                  <b>{i.name}</b>
                </td>
                <td>{c(i.priceInMarket[0])}</td>
                <td>{c(i.priceInMarket[1])}</td>
                <td>{i.extra}</td>
                <td>{i.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};

export default Imbuiments;
