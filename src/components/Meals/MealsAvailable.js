import { useEffect, useState } from 'react';
import { Card } from '../UI/';
import { MealItem } from './Meal';
import classes from './MealsAvailable.module.css';

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedMeals = [];
    const fetchMeals = async () => {
      const responseObject = await (
        await fetch(`${process.env.REACT_APP_FIREBASE_URI}/meals.json`)
      ).json();

      for (const key in responseObject) {
        fetchedMeals.push({
          id: key,
          name: responseObject[key].name,
          description: responseObject[key].description,
          price: responseObject[key].price,
        });
      }

      setMeals(fetchedMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading)
    return (
      <section className={classes.spinner}>
        <p>Loading...</p>
      </section>
    );

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;
