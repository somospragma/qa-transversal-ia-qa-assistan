import { useEffect } from 'react';
import {useAppSelector, useAppDispatch} from 'store/hooks';
import {useLazyGetIsValidApiKeyQuery, clearMessageStatus} from 'store/slices';
import { useForm } from 'shared/hooks';
import { Button, Input, Loading } from 'shared/components';
import {useUserPreferences} from 'shared/context/userPreferences.context';

import './home.page.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { values, register } = useForm();
  const {translate} = useUserPreferences();
  const [getIsValidApiKey] = useLazyGetIsValidApiKeyQuery();
  const {isLoading, status} = useAppSelector((store) => store.apiIA);

  const handleSingIn = () => {
    if(isLoading) return;
    getIsValidApiKey({key: values.apiKey})
  }

  useEffect(() => {
    if(status.code === 0 || status.code === null) return;
    setTimeout(() => {
      dispatch(clearMessageStatus());
    },5000)
    // eslint-disable-next-line
  }, [status])
  
  return (
    <div className='app-container'>
      <section className='app-container__api-key'>
        <h3 
          className='app-container__title' >{translate('public.pages.home.title')}</h3>
        <Input 
          {...register("apiKey", { required: true })}
          placeholder={translate('public.pages.home.placeholder')} 
          className='app-container__input'
          required
        />
        <Button 
          disabled={isLoading || values.apiKey === ''}
          label={isLoading ? translate('public.shared.loading') : translate('public.pages.home.button')} 
          type='button'
          className={
            `app-container__btn-enter 
            ${isLoading || values.apiKey === '' ? 'app-container__btn-enter--disable': ''}`}
          onClick={() => handleSingIn()}
        />
      </section>
      {isLoading && <Loading />}
    </div>
  )
}

export default HomePage
