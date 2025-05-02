import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useForm } from 'shared/hooks';
import {prom} from 'shared';
import { addCriteria, removeCriteria, useLazyGetDataQuery } from 'store/slices';
import { useUserPreferences } from 'shared/context/userPreferences.context';

export const useSummary = () => {
  const { values, register, resetField } = useForm();
  const [getDataQuery] = useLazyGetDataQuery();
  const { translate } = useUserPreferences();
  const dispatch = useAppDispatch();
  const { apiKey, request: { criteriaList },isLoading } = useAppSelector((store) => store.apiIA);

  const addCriteriaList = () => {
    dispatch(addCriteria(values.criteria));
    resetField('criteria');
  }

  const removeCriteriaList = (id: number) => {
    dispatch(removeCriteria(id));
  }

  const handleClick = () => {
    const body = {
      contents: [
        {
          parts: [{ text: `${prom} ${values.description} ${criteriaList.join(", ")}` }]
        }
      ]
    }
    getDataQuery({ key: apiKey, body });
  }

  const isDisable = (type: 'criteria' | 'valid-form'): boolean => {
    if(type === 'criteria') {
        return values.criteria === '';
    }
    return values.description === '' || criteriaList.length === 0 || isLoading;
  }

  return {
    getDataQuery,
    values,
    register,
    resetField,
    translate,
    addCriteriaList,
    removeCriteriaList,
    handleClick,
    isDisable,
    criteriaList
  }
}

export default useSummary