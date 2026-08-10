import cn from 'classnames';
import { ChangeEvent, forwardRef, type JSX } from 'react';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { FormSelect as FormSelectProps } from './types';
import './Select.css';

const Select = forwardRef<HTMLSelectElement, FormSelectProps>((props, ref): JSX.Element => {
  const { customChangeBehaviour, error, ...selectProps } = props;
  const selectClassName = cn(
    'select',
    props.required && 'select--required',
    !!error && 'select--has-error',
  );

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    if (customChangeBehaviour) {
      customChangeBehaviour(e);
    }

    if (!props.onChange) return;
    props.onChange(e);
  };

  return (
    <div className={selectClassName}>
      <label htmlFor={props.id}>
        <Typography className="select__label">{props.label}</Typography>
      </label>
      <select className="select__field" {...selectProps} ref={ref} onChange={handleChange}>
        {props.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" aria-label="Select input" size="xs" className="select__chevron" />
      {error && <div className="select__error">{error}</div>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
