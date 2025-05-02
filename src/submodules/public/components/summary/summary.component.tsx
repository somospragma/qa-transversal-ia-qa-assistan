import {FC} from 'react';
import { useUserPreferences } from 'shared/context/userPreferences.context';
import {CardSummary} from 'submodules/public/components';
import './summary.component.scss';
import { useAppSelector } from 'store/hooks';

export const Summary: FC = () => { 
  const {translate} = useUserPreferences();
  const { 
    response
} = useAppSelector((store) => store.apiIA);

  if(response.length === 0) return null;

  return (
    <div className='test-case__body'>
      <h3 className='test-case__title'>{translate('public.pages.assistant.body.summary.title')}</h3>
      {
       
       response?.map((value) => (
           <CardSummary 
             key={value.id}
             value={value}
           />
         ))
      }
    </div>
  )
}

export default Summary