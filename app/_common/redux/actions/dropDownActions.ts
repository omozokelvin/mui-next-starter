import { getStatesApi } from '@/app/_common/_apis/dropDown';
import { CountryEnum } from '@/app/_common/_types/DropDown';
import { dropDownSlice as slice } from '../slices/dropDownSlice';
import { dispatch } from '../store';

export function getStates(country: CountryEnum) {
  return async () => {
    const key = 'states';

    try {
      dispatch(slice.actions.startLoading(key));

      const { data } = await getStatesApi(country);

      dispatch(slice.actions.setStates({ country, states: data }));

      dispatch(slice.actions.setError({ key, error: null }));
    } catch (error: unknown) {
      dispatch(slice.actions.setError({ key, error }));
    }
  };
}
