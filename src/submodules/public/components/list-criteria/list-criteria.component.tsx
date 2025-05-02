import { FC } from 'react';
import { IconTrash } from 'shared/assets/icons';
import { Button  } from 'shared/components';
import { List } from 'submodules/public/components';
import './list-criteria.component.scss';
interface Iprops {
    data: any[];
    remove: (id: number) => void;
}

export const ListCriteria: FC<Iprops> = ({data, remove}) => {
    return (
        <List 
            className='group__list'
            itemClassName='group__item'
            items={data.map((value, i) => (
                <>
                    <span>{i+1}. {value}</span>
                    <Button className='icon-trash' iconSrc={IconTrash} onClick={() => remove(i)} />
                </>
            ))}
        />
    )
}

export default ListCriteria