import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItems/MealItem';

const AvailableMeals = () => {
  const [meal, setMeal] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://react-fetch-3ecf4-default-rtdb.firebaseio.com/meals%20.json'
      );
      const data = await res.json();
      console.log(data);

      const mealsList = [];

      for (const mealKey in data) {
        mealsList.push({
          ...data[mealKey],
          key: mealKey,
        });
      }

      setMeal(mealsList);
    }
    fetchData();
  }, []);

  console.log(meal);

  const mealsListItems = meal.map(meal => (
    <MealItem
      key={meal.key}
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
