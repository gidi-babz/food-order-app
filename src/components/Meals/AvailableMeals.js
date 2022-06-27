import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItems/MealItem';

const AvailableMeals = () => {
  const [meal, setMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://react-fetch-3ecf4-default-rtdb.firebaseio.com/meals%20.json'
      );

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      console.log(data);

      const mealsList = [];

      for (const mealKey in data) {
        mealsList.push({
          ...data[mealKey],
          id: mealKey,
        });
      }

      setMeal(mealsList);
      setIsLoading(false);
    }
    fetchData().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealLoading}>
        <p>loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsListItems = meal.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsListItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
