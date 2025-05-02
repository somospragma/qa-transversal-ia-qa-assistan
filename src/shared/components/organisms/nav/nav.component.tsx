import {FC} from 'react';
import {IconStart} from 'shared/assets';
import {useUserPreferences} from 'shared/context/userPreferences.context';
import {Button} from 'shared/components';

interface IProps {
  isShow: boolean;
}

export const Nav: FC<IProps> = ({isShow}) => {
  const {translate} = useUserPreferences();
  return (
    <nav className={`nav ${isShow ? 'nav--show' : ''}`}>
      <section className='nav__items'>
        <Button 
          className='nav__link'
          iconSrc={IconStart}
          label={translate('public.pages.assistant.nav.firstBtn')}
        />
      </section>
    </nav>
  )
}

export default Nav