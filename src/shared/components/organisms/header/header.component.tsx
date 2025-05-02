import { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import {IconBars, IconArrowBack} from 'shared/assets';
import {Image} from 'shared/components';
import { useUserPreferences } from 'shared/context/userPreferences.context';
import { useAppDispatch } from 'store/hooks';
import { clearState } from 'store/slices';

interface Iprops {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<Iprops> = ({setIsShow, isShow}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {translate} = useUserPreferences();
  const onClickExit = () => {
    localStorage.removeItem('apiKey');
    dispatch(clearState());
  }
  return (
    <header className='header'>
        <Image 
          figureClassName='header__figure header__figure--bars'
          className='header__img header__img--bars'
          alt='icon-bars'
          src={IconBars}
          onClick={() => setIsShow(!isShow)}
        />
      <Image
        figureClassName='header__figure'
        className='header__img'
        captionClassName='header__figcaption'
        alt='icon-row-back'
        src={IconArrowBack} 
        caption={translate('public.pages.assistant.header.title')}
        onClick={() => onClickExit()}
      />
    </header>
  )
}

export default Header