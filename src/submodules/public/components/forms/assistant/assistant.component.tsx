import { ListCriteria, Summary } from 'submodules/public/components';
import { Input, Button, } from 'shared/components';
import {useSummary} from 'submodules/public/hooks';
import { IconPlus, } from 'shared/assets/icons';
import './assistant.component.scss';

export const AssistantComponent = () => {
    const {
        register,
        translate,
        addCriteriaList,
        removeCriteriaList,
        handleClick,
        isDisable,
        criteriaList
    } = useSummary();

    return (
        <section className='form__container'>
            <div className='group-form'>
                <Input
                    {...register("description", { required: true })}
                    label={translate('public.pages.assistant.body.firstLabel')}
                    isTextArea={true}
                    className='form__input form__input--textarea'
                />
            </div>
            <div className='group-form group-form--criteria'>
                <Input
                        {...register("criteria", { required: true })}
                        label={translate('public.pages.assistant.body.secondLabel')}
                        className='form__input'
                    />
                <Button
                    className={`form__button ${isDisable('criteria') ? 'form__button--disabled' : ''}`}
                    iconSrc={IconPlus}
                    disabled={isDisable('criteria')}
                    onClick={() => addCriteriaList()}
                />
            </div>
            <ListCriteria data={criteriaList} remove={removeCriteriaList} />
            <div className='group_form'>
                <Button 
                    className={`btn__generate ${isDisable('valid-form') ? 'btn__generate--disabled' : ''}`} 
                    label={translate('public.pages.assistant.body.button')}
                    disabled={isDisable('valid-form')}
                    onClick={() => handleClick()}
                />
            </div>
            <Summary />
        </section>
    )
}

export default AssistantComponent