import { FC, useState } from 'react';
import { Image } from 'shared/components';
import { List } from 'submodules/public/components';
import { IconTest, IconArrowRight, IconArrowDown } from 'shared/assets';
import { useUserPreferences } from 'shared/context/userPreferences.context';
import './card-summary.component.scss';
interface Iprops {
    value: {
        id: string;
        description: string;
        expected_result: string;
        gherking: string;
        name: string;
        preconditions: string[];
        priority: string;
        recommendations: string[];
        type: string;
    };
}

export const CardSummary: FC<Iprops> = ({ value }) => {
    const { translate } = useUserPreferences();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <section className='test-case__item'>
            <Image
                figureClassName='test-case__figure'
                className='test-case__img'
                alt='icon-test'
                src={IconTest}
            />
            <div className="test-case__group">
                <h4 className="test-case__group__title" >
                    {translate('public.pages.assistant.body.summary.test_case')} - {value.id}
                </h4>
                <p className="test-case__group__name" >{value.name}</p>
                <Image
                    figureClassName='test-case__group__figure' className='test-case__group__img'
                    alt='icon-arrow-right'
                    src={isExpanded ? IconArrowDown : IconArrowRight}
                    onClick={() => setIsExpanded(!isExpanded)}
                />
                <section
                    className={isExpanded ? 'test-case__summary test-case__summary--show' : 'test-case__summary'}>
                    <List
                        items={[
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.description')} </b>
                                    {value.description}
                            </>,
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.priority')} </b>
                                    {value.priority}
                            </>,
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.type')} </b>
                                    {value.type}
                            </>,
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.preconditions')} </b>
                            </>,
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.gherkin')} </b>
                                    {value.gherking}
                            </>,
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.expected_result')} </b>
                                {value.expected_result}
                            </>,
                            <>
                                <b>{translate('public.pages.assistant.body.summary.card.recommendations')} </b>
                            </>,
                        ]}
                        nestedLists={[
                            null,
                            null,
                            null,
                            <List
                                items={value.preconditions}
                                itemClassName='test-case_list-item--secundary'
                                className='test-case_list test-case_list--secundary'
                            />,
                            null,
                            null,
                            <List
                                items={value.recommendations}
                                itemClassName='test-case_list-item--secundary'
                                className='test-case_list test-case_list--secundary'
                            />
                        ]}
                        className="test-case_list"
                        itemClassName="test-case_list-item"
                    />
                </section>
            </div>
        </section>
    )
}

export default CardSummary