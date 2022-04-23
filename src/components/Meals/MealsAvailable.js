import { useEffect, useState } from 'react';
import { Card } from '../UI/';
import { MealItem } from './Meal';
import classes from './MealsAvailable.module.css';

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchedMeals = [];

    const fetchMeals = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URI}/meals.json`
      );
      if (!response.ok) throw new Error('Something went wrong!');
      const responseObject = await response.json();

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

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading)
    return (
      <section className={classes.spinner}>
        <p>Loading...</p>
      </section>
    );

  if (httpError)
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
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
